import { createModel } from './create-model';
import { createUser } from './create-user';
import { getModel } from './get-model';
import { getNull } from './get-null';
import { getUser } from './get-user';
import { getVersion } from './get-version';
import { listModels } from './list-models';
import { throwError } from './throw-error';

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
