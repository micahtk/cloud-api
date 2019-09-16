import { CognitoUserPoolConfiguration } from './cognito-user-pool-configuration';
import { SystemId } from './constants';

describe(CognitoUserPoolConfiguration.name, () => {
  it('returns an object with userPoolId and userPoolClientId', async () => {
    for (const systemId of ['local', 'development', 'qa', 'production']) {
      const config = CognitoUserPoolConfiguration(systemId as SystemId);
      expect(config.userPoolId).toBeTruthy();
      expect(config.userPoolClientId).toBeTruthy();
    }
  });
});
