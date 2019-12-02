window['fetch'] = require('node-fetch');

import { runAndCatch } from './run-and-catch';

import { RpcClient } from './rpc-client';
import { AuthenticationState } from './authentication-client';
import { TestUser } from './test-user';
import { TestAuthenticationClient } from './test-authentication-client';

describe(RpcClient.name, () => {
  it('Integration tests with the authentication client and development API', async () => {
    const testUser = await TestUser();
    const authenticationClient = TestAuthenticationClient();
    const signInResolvedValue = await authenticationClient.signIn(
      testUser.email,
      testUser.temporaryPassword,
    );
    if (
      signInResolvedValue.authenticationState !==
      AuthenticationState.NON_TEMPORARY_PASSWORD_REQUIRED
    ) {
      throw new Error(
        `Expected authentication state to be "${
          AuthenticationState.NON_TEMPORARY_PASSWORD_REQUIRED
        }"`,
      );
    }
    await signInResolvedValue.setNonTemporaryPassword(testUser.password);
    const { getAuthorizationHeader } = authenticationClient;
    const rpcClient = RpcClient({ systemId: 'development', getAuthorizationHeader });

    // Just hit a couple "test" endpoints
    expect(await rpcClient.getNull()).toBe(null);
    const message = 'An error message';
    const code = 'AN_ERROR_CODE';
    const data = {
      foo: 'bar',
    };

    // The throwError RPC throws an error on the back end but the
    // cloud-api-server does not leak unexpected errors. The development
    // cloud-api-server, however, does attaches the original exception as the
    // "data" property in the returned body.
    const exception = await runAndCatch(rpcClient.throwError, message, code, data);
    expect(exception.message).toMatch(/unexpected/i);
    expect(exception.code).toMatch(/unexpected/i);
    expect(exception.data.code).toBe(code);
    expect(exception.data.message).toBe(message);
    expect(exception.data.data).toEqual(data);
    expect(typeof exception.stack).toBe('string');

    await testUser.destroy();
  });
});
