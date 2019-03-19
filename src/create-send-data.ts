import { CodedError } from '@carnesen/coded-error';
import * as http from 'http';
import * as https from 'https';
import { Config } from './types';
import { RPC_PATH } from './constants';

export function createSendData(config: Config) {
  const { protocol, hostname, port, username, password } = config;
  const auth = `${username}:${password}`;

  return function sendData(data: string) {
    return new Promise<string>((resolve, reject) => {
      const req = (protocol === 'http' ? http : https).request({
        hostname,
        port,
        method: 'POST',
        path: RPC_PATH,
        auth,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      });

      req.end(data);

      req.once('response', (res: http.IncomingMessage) => {
        let responseData = '';

        res.on('data', chunk => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode! < 500) {
            resolve(responseData);
          } else {
            reject(
              new CodedError(`Server responded status ${res.statusCode}`, res.statusCode),
            );
          }
        });
      });

      req.on('error', (err: NodeJS.ErrnoException) => {
        reject(new CodedError(`http request failed "${err.message}"`, err.code));
      });
    });
  };
}
