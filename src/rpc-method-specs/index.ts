import { createModelVersion } from './create-model-version';
import { deleteModelVersions } from './delete-model-versions';
import { finalizeModelVersion } from './finalize-model-version';
import { getModelVersion } from './get-model-version';
import { getNull } from './get-null';
import { getServerVersion } from './get-server-version';
import { listModelVersions } from './list-model-versions';
import { throwError } from './throw-error';

export const rpcMethodSpecs = {
  createModelVersion,
  finalizeModelVersion,
  getModelVersion,
  listModelVersions,
  deleteModelVersions,

  getServerVersion,
  getNull,
  throwError,
};
