import * as t from 'io-ts';
import { emptyTuple } from './codecs/empty-tuple';
import { nullableString } from './codecs/nullable-string';

export const rpcMethodSpecs = {
  createUser: {
    description: 'Create a new alwaysAI user',
    argsCodec: t.tuple([
      t.type({ username: t.string, emailAddress: nullableString, password: t.string }),
    ]),
    resultCodec: t.type({
      uuid: t.string,
    }),
  },

  getNull: {
    description: 'Get the value "null" for testing purposes',
    argsCodec: emptyTuple,
    resultCodec: t.null,
  },

  getUser: {
    description: 'Get a user by username',
    argsCodec: t.tuple([t.type({ username: t.string })]),
    resultCodec: t.type({
      username: t.string,
      emailAddress: t.union([t.string, t.null]),
    }),
  },

  throwError: {
    description: 'Throw an error for testing purposes',
    argsCodec: t.tuple([t.string, t.any, t.any]),
    resultCodec: t.unknown,
  },
};
