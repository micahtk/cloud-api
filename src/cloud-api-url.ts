import { SystemId } from './constants';
import { SystemDomainName } from './system-domain-name';

export function CloudApiUrl(systemId: SystemId) {
  let cloudApiUrl: string;
  switch (systemId) {
    case 'local': {
      cloudApiUrl = 'http://localhost:8000';
      break;
    }

    case 'development':
    case 'qa':
    case 'production': {
      cloudApiUrl = `https://api.${SystemDomainName(systemId)}`;
      break;
    }

    default: {
      throw new Error(`Unsupported systemID "${systemId}"`);
    }
  }
  return cloudApiUrl;
}
