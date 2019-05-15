import { createModelVersion } from './create-model-version';
import { createUser } from './create-user';
import { getModelVersion } from './get-model-version';
import { getNull } from './get-null';
import { getUser } from './get-user';
import { getVersion } from './get-version';
import { listModelVersions } from './list-model-versions';
import { throwError } from './throw-error';
import { finalizeModelVersion } from './finalize-model-version';

export const rpcMethodSpecs = {
  createUser,
  getUser,

  createModelVersion,
  finalizeModelVersion,
  listModelVersions,
  getModelVersion,

  getVersion,
  getNull,
  throwError,
};
