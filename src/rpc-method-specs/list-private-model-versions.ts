import * as t from 'io-ts';
import { rpcModelVersionCodec } from '../rpc-model-version';

export const listPrivateModelVersions = {
  description: 'List alwaysAI model versions',
  argsCodec: t.tuple([
    t.type({
      publisher: t.string,
    }),
  ]),
  resultCodec: t.array(rpcModelVersionCodec),
};
