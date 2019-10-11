window['fetch'] = require('node-fetch');

import { AuthenticationClient, AuthenticationState } from './authentication-client';
import { TestUser } from './test-user';
import {
  TestAuthenticationClient,
  testAuthenticationClientStorage,
} from './test-authentication-client';
import { runAndCatch } from '@carnesen/run-and-catch';
import { ErrorCode } from './error-code';

describe(AuthenticationClient.name, () => {
  it('Big test of all the methods', async () => {
    const testUser = await TestUser();
    const authenticationClient = TestAuthenticationClient();

    let exception: any;
    exception = await runAndCatch(authenticationClient.getInfo);
    expect(exception.code).toBe(ErrorCode.NOT_SIGNED_IN);

    exception = await runAndCatch(authenticationClient.getAuthorizationHeader);
    expect(exception.code).toBe(ErrorCode.NOT_SIGNED_IN);

    // Test initial login and change password
    expect(authenticationClient.isSignedIn()).toBe(false);
    let signInResolvedValue = await authenticationClient.signIn(
      testUser.email,
      testUser.temporaryPassword,
    );
    if (
      signInResolvedValue.authenticationState !==
      AuthenticationState.NON_TEMPORARY_PASSWORD_REQUIRED
    ) {
      throw new Error(
        `Expected authentication state to be ${
          AuthenticationState.NON_TEMPORARY_PASSWORD_REQUIRED
        }`,
      );
    }

    // We are still not yet fully signed in
    expect(authenticationClient.isSignedIn()).toBe(false);

    const { setNonTemporaryPassword } = signInResolvedValue;
    let setNonTemporaryPasswordResolvedValue = await setNonTemporaryPassword('1234567');
    expect(setNonTemporaryPasswordResolvedValue.authenticationState).toBe(
      AuthenticationState.INVALID_PASSWORD,
    );
    setNonTemporaryPasswordResolvedValue = await setNonTemporaryPassword(
      testUser.password,
    );
    expect(setNonTemporaryPasswordResolvedValue.authenticationState).toBe(
      AuthenticationState.AUTHENTICATED,
    );

    // Now we are fully signed in
    expect(authenticationClient.isSignedIn()).toBe(true);
    expect(testAuthenticationClientStorage.listItems().length).toBeGreaterThan(0);

    // Let's sign out and see if we can sign back in with the new password
    authenticationClient.signOut();
    expect(testAuthenticationClientStorage.listItems().length).toBe(0);
    expect(authenticationClient.isSignedIn()).toBe(false);

    // Now the user has completed their initial login. Test subsequent logins.
    signInResolvedValue = await authenticationClient.signIn(
      testUser.email,
      testUser.password,
    );
    expect(signInResolvedValue.authenticationState).toBe(
      AuthenticationState.AUTHENTICATED,
    );

    // getAccessJwt method
    const { Authorization } = await authenticationClient.getAuthorizationHeader();
    const [bearerPrefix, jwt] = Authorization.split(' ');
    expect(bearerPrefix).toBe('Bearer');
    expect(jwt.split('.').length).toBe(3);

    // getInfo method
    const UUID_REGEX = /[\-a-f0-9]{36}/;
    const info = await authenticationClient.getInfo();
    expect(info.uuid).toMatch(UUID_REGEX);
    expect(info.email).toBe(testUser.email);
    expect(info.username).toBe(testUser.username);

    await testUser.destroy();
  }, 10000);
});
