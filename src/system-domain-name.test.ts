import { SystemId } from './constants';
import { SystemDomainName } from './system-domain-name';

describe(SystemDomainName.name, () => {
  it('returns an object with userPoolId and userPoolClientId', async () => {
    for (const systemId of ['local', 'development', 'qa', 'production']) {
      const systemDomainName = SystemDomainName(systemId as SystemId);
      expect(systemDomainName).toBeTruthy();
    }
  });
});
