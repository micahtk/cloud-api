import * as t from 'io-ts';
import { RpcMethodSpec } from '../rpc-types';
import { modelVersion } from '../codecs/model-version';

export const createModelVersion = RpcMethodSpec({
  description: 'Publish a new alwaysAI model',
  argsCodec: t.tuple([modelVersion], 'args'),
  resultCodec: modelVersion,
});
