import * as t from 'io-ts';
import { rpcModelVersionCodec } from '../rpc-model-version';

export const listModels = {
  description: 'List alwaysAI models',
  argsCodec: t.tuple([
    t.partial({
      publisher: t.array(t.string),
      frameworkType: t.array(t.string),
      categories: t.array(t.string),
      powerConsumption: t.string,
      size: t.string,
      license: t.array(t.string),
      inferenceTime: t.string,
      board: t.string,
      dataSet: t.array(t.string),
      osCompatibility: t.array(t.string),
    }),
  ]),
  resultCodec: t.array(rpcModelVersionCodec),
};
