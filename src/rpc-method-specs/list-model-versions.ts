import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';
import { rpcModelVersionCodec } from '../rpc-model-version';

export const listModelVersions = {
  description: 'List alwaysAI model versions',
  argsCodec: c.emptyArray,
  resultCodec: t.array(rpcModelVersionCodec),
};
