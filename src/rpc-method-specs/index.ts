import * as t from 'io-ts';

import { emptyTuple } from '../codecs/empty-tuple';
import { nullableString, optionalString, uuidString } from '../codecs/strings';

import { createUser } from './create-user';
import { createModel } from './create-model';

export const rpcMethodSpecs = {
  createModel,
  createUser,

  getNull: {
    description: 'Get the value "null" for testing purposes',
    argsCodec: emptyTuple,
    resultCodec: t.null,
  },

  getUser: {
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
  },

  throwError: {
    description: 'Throw an error for testing purposes',
    argsCodec: t.tuple([optionalString, t.any, t.any], 'args'),
    resultCodec: t.unknown,
  },
};
