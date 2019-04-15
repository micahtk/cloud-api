import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';
import { RpcMethodSpec } from '../rpc-types';

export const getUser = RpcMethodSpec({
  description: 'Get a user by username',
  argsCodec: t.tuple(
    [
      t.type({
        username: t.string,
      }),
    ],
    'args',
  ),
  resultCodec: t.type(
    {
      username: t.string,
      uuid: c.uuid,
      firstName: c.nullableString,
      lastName: c.nullableString,
      createdAt: t.string,
    },
    'result',
  ),
});
