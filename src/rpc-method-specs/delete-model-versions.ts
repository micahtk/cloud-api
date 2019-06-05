import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { modelVersion } from '../codecs/model-version';

const argsCodec = t.tuple(
  [t.intersection([t.type({ id: t.string }), t.partial({ version: t.string })])],
  'args',
);

export const deleteModelVersions = RpcMethodSpec({
  description: 'Delete model versions',
  argsCodec,
  resultCodec: t.array(modelVersion),
});
