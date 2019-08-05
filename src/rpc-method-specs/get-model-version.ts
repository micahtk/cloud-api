import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { rpcModelVersionCodec } from '../rpc-model-version';

const argsCodec = t.tuple(
  [t.intersection([t.type({ id: t.string }), t.partial({ version: t.number })])],
  'args',
);

export const getModelVersion = RpcMethodSpec({
  description: 'Get information about an alwaysAI model',
  argsCodec,
  resultCodec: rpcModelVersionCodec,
});
