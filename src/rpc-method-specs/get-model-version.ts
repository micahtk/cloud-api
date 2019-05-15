import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { modelVersion } from '../codecs/model-version';

const argsCodec = t.tuple(
  [t.intersection([t.type({ id: t.string }), t.partial({ version: t.string })])],
  'args',
);

export const getModelVersion = RpcMethodSpec({
  description: 'Get information about an alwaysAI model',
  argsCodec,
  resultCodec: modelVersion,
});
