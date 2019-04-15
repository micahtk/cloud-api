import * as t from 'io-ts';
import { RpcMethodSpec } from '../rpc-types';

export const createUser = RpcMethodSpec({
  description: 'Create a new alwaysAI user',
  argsCodec: t.tuple(
    [
      t.type({
        username: t.string,
        email: t.string,
        password: t.string,
        displayName: t.string,
      }),
    ],
    'args',
  ),
  resultCodec: t.type(
    {
      uuid: t.string,
    },
    'result',
  ),
});
