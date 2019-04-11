import * as t from '@alwaysai/codecs';

import { createUser } from './create-user';
import { createModel } from './create-model';
import { getModel } from './get-model';
import { getUser } from './get-user';
import { listModels } from './list-models';
import { getVersion } from './get-version';

export const rpcMethodSpecs = {
  createModel,
  createUser,
  getModel,
  getNull: {
    description: 'Get the value "null" for testing purposes',
    argsCodec: t.emptyArray,
    resultCodec: t.null,
  },
  getUser,
  getVersion,
  listModels,
  throwError: {
    description: 'Throw an error for testing purposes',
    argsCodec: t.tuple([t.optionalString, t.any, t.any], 'args'),
    resultCodec: t.unknown,
  },
};
