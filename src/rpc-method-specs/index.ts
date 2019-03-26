import * as t from 'io-ts';

import { emptyTupleCodec } from '../codecs/empty-tuple-codec';
import { optionalString } from '../codecs/string-codecs';

import { createUser } from './create-user';
import { createModel } from './create-model';
import { getModel } from './get-model';
import { getUser } from './get-user';
import { listModels } from './list-models';

export const rpcMethodSpecs = {
  createModel,
  createUser,
  getModel,
  getUser,
  listModels,
  getNull: {
    description: 'Get the value "null" for testing purposes',
    argsCodec: emptyTupleCodec,
    resultCodec: t.null,
  },

  throwError: {
    description: 'Throw an error for testing purposes',
    argsCodec: t.tuple([optionalString, t.any, t.any], 'args'),
    resultCodec: t.unknown,
  },
};
