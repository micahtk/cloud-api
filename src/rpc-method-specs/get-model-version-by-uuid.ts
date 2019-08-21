import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { rpcModelVersionCodec } from '../rpc-model-version';

const uuidCodec = t.string;
const argsCodec = t.tuple([uuidCodec], 'args');

export const getModelVersionByUuid = RpcMethodSpec({
  description:
    'Get information about an alwaysAI model version by UUID. Unlike getModelVersionById, this method will return non-final model versions as well as final ones',
  argsCodec,
  resultCodec: rpcModelVersionCodec,
});
