import { SystemId } from './constants';

export function SystemDomainName(systemId: SystemId) {
  let systemDomainName: string;
  switch (systemId) {
    case 'local':
    case 'development': {
      systemDomainName = 'a6i0.net';
      break;
    }

    case 'qa': {
      systemDomainName = 'a6i1.net';
      break;
    }

    case 'production': {
      systemDomainName = 'alwaysai.co';
      break;
    }

    default: {
      throw new Error(`Unsupported systemID "${systemId}"`);
    }
  }
  return systemDomainName;
}
