import * as t from 'io-ts';

import { nullableString, uuidString } from '../codecs/string-codecs';

export const getUser = {
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
      uuid: uuidString,
      firstName: nullableString,
      lastName: nullableString,
      createdAt: t.string,
    },
    'result',
  ),
};
