import * as t from 'io-ts';
import { rpcModelVersionCodec } from '../rpc-model-version';

const publisherCodec = t.string;

const argsCodec = t.tuple([t.array(publisherCodec)], 'args');

export const listModels = {
  description: 'List alwaysAI models',
  argsCodec,
  resultCodec: t.array(rpcModelVersionCodec),
};
