import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CognitoUserPoolConfiguration } from './cognito-user-pool-configuration';

const { userPoolId } = CognitoUserPoolConfiguration('development');

function RandomString() {
  return Math.random()
    .toString(36)
    .substring(3);
}

// Default credentials will be used
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  region: 'us-west-2',
});

// The alwaysai.test@gmail.com email has the test@alwaysai.co shared inbox as
// its recovery address. It's good to use a real email address in case we need
// to look at the emails that get sent and also to keep our bounce rate low. We
// need more than one distinct address because the unit tests run in parallel.
export async function TestUser() {
  const id = RandomString();
  const email = `alwaysai.test+${id}@gmail.com`;
  const username = `test-${id}`;

  const temporaryPassword = RandomString();
  // ^^ This is used in "create" as the user's initial "temporary" password

  const password = `${RandomString()}😃`;
  // ^^This is the user's "desired" non-temporary password including non-ASCII char

  await cognitoIdentityServiceProvider
    .adminCreateUser({
      UserPoolId: userPoolId,
      Username: username,
      UserAttributes: [
        {
          Name: 'email_verified',
          Value: 'True',
        },
        {
          Name: 'email',
          Value: email,
        },
      ],
      TemporaryPassword: temporaryPassword,
    })
    .promise();

  return {
    email,
    username,
    temporaryPassword,
    password,
    async destroy() {
      try {
        await cognitoIdentityServiceProvider
          .adminDisableUser({
            UserPoolId: userPoolId,
            Username: username,
          })
          .promise();
        await cognitoIdentityServiceProvider
          .adminDeleteUser({
            UserPoolId: userPoolId,
            Username: username,
          })
          .promise();
      } catch (exception) {
        if (exception.code !== 'UserNotFoundException') {
          throw exception;
        }
      }
    },
  };
}
