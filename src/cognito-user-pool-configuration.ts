import { SystemId } from './constants';

export function CognitoUserPoolConfiguration(systemId: SystemId) {
  let userPoolId: string;
  let userPoolClientId: string;
  switch (systemId) {
    case 'local':
    case 'development': {
      userPoolId = 'us-west-2_1qn5QzXzP';
      userPoolClientId = '3mot5qlvchlui2mqs803fccbvm';
      break;
    }

    case 'qa': {
      userPoolId = 'us-west-2_R6z7U5NYX';
      userPoolClientId = '1l5f4j6lues6lgaoil43v4fc8n';
      break;
    }

    case 'production': {
      userPoolId = 'us-west-2_4GY5EITYm';
      userPoolClientId = '2mm3lcucrf53da27mjs5p5ei47';
      break;
    }

    default: {
      throw new Error(`Unsupported systemID "${systemId}"`);
    }
  }

  return {
    userPoolId,
    userPoolClientId,
  };
}
