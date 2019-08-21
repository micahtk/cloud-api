import { createModelVersion } from './create-model-version';
import { createModelVersionFromBlobs } from './create-model-version-from-blobs';
import { deleteModelVersions } from './delete-model-versions';
import { finalizeModelVersion } from './finalize-model-version';
import { getModelVersion } from './get-model-version';
import { getNull } from './get-null';
import { getServerVersion } from './get-server-version';
import { listPublicModelVersions } from './list-public-model-versions';
import { throwError } from './throw-error';
import { listPrivateModelVersions } from './list-private-model-versions';
import { getModelVersionByUuid } from './get-model-version-by-uuid';

export const rpcMethodSpecs = {
  createModelVersion,
  createModelVersionFromBlobs,
  deleteModelVersions,
  finalizeModelVersion,
  getModelVersion,
  getModelVersionByUuid,
  listPublicModelVersions,
  listPrivateModelVersions,

  getServerVersion,
  getNull,
  throwError,
};
