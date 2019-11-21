import * as t from 'io-ts';
import { rpcModelVersionCodec } from '../rpc-model-version';

// const publisherCodec = t.string;

// const args = t.type({ publisher: t.array(publisherCodec) });

export const listModels = {
  description: 'List alwaysAI models',
  argsCodec: t.tuple([
    t.type({
      publisher: t.array(t.string),
    }),
  ]),
  resultCodec: t.array(rpcModelVersionCodec),
};
