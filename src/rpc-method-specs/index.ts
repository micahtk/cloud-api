import { createUser } from './create-user';
import { createModel } from './create-model';
import { getModel } from './get-model';
import { getUser } from './get-user';
import { listModels } from './list-models';
import { getVersion } from './get-version';
import { throwError } from './throw-error';
import { getNull } from './get-null';

export const rpcMethodSpecs = {
  createModel,
  createUser,
  getModel,
  getNull,
  getUser,
  getVersion,
  listModels,
  throwError,
};
