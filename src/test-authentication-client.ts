import { AuthenticationClient } from './authentication-client';
import { AuthenticationInMemoryStorage } from './authentication-in-memory-storage';

export const testAuthenticationClientStorage = AuthenticationInMemoryStorage();

export function TestAuthenticationClient() {
  return AuthenticationClient({
    systemId: 'development',
    storage: testAuthenticationClientStorage,
  });
}
