import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  AuthenticationDetails,
  UserData,
} from 'amazon-cognito-identity-js';
import keyMirror = require('keymirror');
import { SystemId } from './constants';
import { CognitoUserPoolConfiguration } from './cognito-user-pool-configuration';
import { CodedError } from '@carnesen/coded-error';
import { ErrorCode } from './error-code';

export type AuthenticationStorage = {
  setItem(key: string, value: string): void;
  getItem(key: string): string;
  removeItem(key: string): void;
  clear(): void;
};

export const AuthenticationState = keyMirror({
  AUTHENTICATED: null,
  USER_CONFIRMATION_REQUIRED: null,
  PASSWORD_RESET_REQUIRED: null,
  INCORRECT_PASSWORD: null,
  USER_NOT_FOUND: null,
  NON_TEMPORARY_PASSWORD_REQUIRED: null,
  INVALID_PASSWORD: null,
  MFA_REQUIRED: null,
  TOTP_REQUIRED: null,
  MFA_SETUP: null,
  SELECT_MFA_TYPE: null,
  CUSTOM_CHALLENGE: null,
});

type AuthenticationState = keyof typeof AuthenticationState;

const NOT_SIGNED_IN_MESSAGE = `${AuthenticationClient.name} is not signed in`;

export function AuthenticationClient(config: {
  systemId: SystemId;
  storage: AuthenticationStorage;
  readonly?: boolean;
}) {
  const { systemId, storage, readonly } = config;

  // "readonly": We encountered some difficult-to-diagnose behavior in the
  // alwaysAI CLI where a pending background call to getInfo was coming back and
  // re-writing the storage despite the fact that the user had since "logged
  // out". This is a bit of a hack to work around that.

  const { userPoolId, userPoolClientId } = CognitoUserPoolConfiguration(systemId);

  const cognitoUserPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: userPoolClientId,
    Storage: readonly ? ReadonlyStorage(storage) : storage,
  });

  let cognitoUser: CognitoUser | undefined =
    cognitoUserPool.getCurrentUser() || undefined;
  let cognitoUserSession: CognitoUserSession | undefined = undefined;
  return {
    isSignedIn() {
      return Boolean(cognitoUser);
    },

    signOut() {
      if (cognitoUser) {
        cognitoUser.signOut();
        unsetCognitoUser();
        unsetCognitoUserSession();
        cognitoUserSession = undefined;
      }
    },

    async getAuthorizationHeader() {
      const session = await getCognitoUserSession();
      const jwt = session.getAccessToken().getJwtToken();
      return { Authorization: `Bearer ${jwt}` };
    },

    async getInfo() {
      const cognitoUser = getCognitoUser();
      await getCognitoUserSession();

      const userData: UserData = await new Promise((resolve, reject) => {
        cognitoUser.getUserData((err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Failed to fetch user data'));
            }
          }
        });
      });

      return {
        username: userData.Username,
        uuid: findUserAttribute(userData, 'sub'),
        email: findUserAttribute(userData, 'email'),
      };
    },

    async signIn(email: string, password: string) {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      // This cognito user does not get persisted until authentication and all
      // challenges are complete.
      const nextCognitoUser = new CognitoUser({
        Username: email,
        Pool: cognitoUserPool,
        Storage: storage,
      });

      nextCognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

      const authenticationState: keyof typeof AuthenticationState = await new Promise(
        (resolve, reject) => {
          nextCognitoUser.authenticateUser(authenticationDetails, {
            onSuccess(_, userConfirmationIsRequired) {
              if (userConfirmationIsRequired) {
                resolve(AuthenticationState.USER_CONFIRMATION_REQUIRED);
              } else {
                setCognitoUser(nextCognitoUser);
                resolve(AuthenticationState.AUTHENTICATED);
              }
            },
            onFailure(err) {
              switch (err.code) {
                case 'PasswordResetRequiredException': {
                  resolve(AuthenticationState.PASSWORD_RESET_REQUIRED);
                  break;
                }

                case 'NotAuthorizedException': {
                  resolve(AuthenticationState.INCORRECT_PASSWORD);
                  break;
                }

                case 'UserNotFoundException': {
                  resolve(AuthenticationState.USER_NOT_FOUND);
                  break;
                }

                default: {
                  reject(err);
                }
              }
            },
            newPasswordRequired() {
              resolve(AuthenticationState.NON_TEMPORARY_PASSWORD_REQUIRED);
            },
            mfaRequired() {
              resolve(AuthenticationState.MFA_REQUIRED);
            },
            totpRequired() {
              resolve(AuthenticationState.TOTP_REQUIRED);
            },
            mfaSetup() {
              resolve(AuthenticationState.MFA_SETUP);
            },
            selectMFAType() {
              resolve(AuthenticationState.SELECT_MFA_TYPE);
            },
            customChallenge() {
              resolve(AuthenticationState.CUSTOM_CHALLENGE);
            },
          });
        },
      );

      switch (authenticationState) {
        case AuthenticationState.NON_TEMPORARY_PASSWORD_REQUIRED: {
          return {
            authenticationState,
            async setNonTemporaryPassword(password: string) {
              const nextAuthenticationState: AuthenticationState = await new Promise(
                (resolve, reject) => {
                  nextCognitoUser.completeNewPasswordChallenge(password, null, {
                    onSuccess() {
                      setCognitoUser(nextCognitoUser);
                      resolve(AuthenticationState.AUTHENTICATED);
                    },
                    onFailure(err) {
                      if (err.code === 'InvalidPasswordException') {
                        resolve(AuthenticationState.INVALID_PASSWORD);
                      } else {
                        reject(err);
                      }
                    },
                    mfaSetup() {
                      resolve(AuthenticationState.MFA_SETUP);
                    },
                    mfaRequired() {
                      resolve(AuthenticationState.MFA_REQUIRED);
                    },
                    customChallenge() {
                      resolve(AuthenticationState.CUSTOM_CHALLENGE);
                    },
                  });
                },
              );
              return { authenticationState: nextAuthenticationState };
            },
          };
        }

        default: {
          return {
            authenticationState,
          };
        }
      }
    },
  };

  async function getCognitoUserSession() {
    if (cognitoUserSession) {
      return cognitoUserSession;
    }
    return await new Promise<CognitoUserSession>((resolve, reject) => {
      if (!cognitoUser) {
        throw new CodedError(NOT_SIGNED_IN_MESSAGE, ErrorCode.NOT_SIGNED_IN);
      }
      cognitoUser.getSession(
        (errFromGetSession: Error, nextCognitoUserSession: CognitoUserSession) => {
          if (errFromGetSession) {
            reject(errFromGetSession);
          } else {
            const refreshToken = nextCognitoUserSession.getRefreshToken();
            if (!cognitoUser) {
              throw new Error('cognitoUser is no longer defined');
            }
            // It might be overkill to refresh the session every time, but we
            // were running into intermittent "ID token has expired" errors and
            // this seems to fix that.
            cognitoUser.refreshSession(
              refreshToken,
              (errFromRefreshSession, refreshedSession) => {
                if (errFromRefreshSession) {
                  reject(errFromRefreshSession);
                } else {
                  setCognitoUserSession(refreshedSession);
                  resolve(refreshedSession);
                }
              },
            );
          }
        },
      );
    });
  }

  function getCognitoUser() {
    if (!cognitoUser) {
      throw new CodedError(NOT_SIGNED_IN_MESSAGE, ErrorCode.NOT_SIGNED_IN);
    }
    return cognitoUser;
  }

  function unsetCognitoUser() {
    cognitoUser = undefined;
  }

  function setCognitoUser(nextCognitoUser: CognitoUser) {
    cognitoUser = nextCognitoUser;
  }

  function unsetCognitoUserSession() {
    cognitoUserSession = undefined;
  }

  function setCognitoUserSession(nextCognitoUserSession: CognitoUserSession) {
    cognitoUserSession = nextCognitoUserSession;
  }
}

function findUserAttribute(userData: UserData, name: string) {
  const attribute = userData.UserAttributes.find(({ Name }) => Name === name);
  if (!attribute || !attribute.Value) {
    throw new Error(`Failed to find user attribute "${name}"`);
  }
  return attribute.Value;
}

function ReadonlyStorage(storage: AuthenticationStorage) {
  const readonlyStorage: AuthenticationStorage = {
    clear() {},
    getItem(key) {
      return storage.getItem(key);
    },
    removeItem() {},
    setItem() {},
  };
  return readonlyStorage;
}
