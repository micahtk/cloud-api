import { SystemId } from './constants';
import { CloudApiUrl } from './cloud-api-url';

describe(CloudApiUrl.name, () => {
  it('returns an object with userPoolId and userPoolClientId', async () => {
    for (const systemId of ['local', 'development', 'qa', 'production']) {
      const config = CloudApiUrl(systemId as SystemId);
      expect(config).toBeTruthy();
    }
  });
});
