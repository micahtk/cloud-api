import { AuthenticationStorage } from './authentication-client';

let data: { [key: string]: string } = {};

export function AuthenticationInMemoryStorage() {
  const storage: AuthenticationStorage & { listItems: () => [string, string][] } = {
    listItems() {
      return Object.entries(data);
    },
    setItem(key, value) {
      data[key] = value;
    },
    getItem(key) {
      return data[key] || '';
    },
    removeItem(key) {
      delete data[key];
    },
    clear() {
      data = {};
    },
  };
  return storage;
}
