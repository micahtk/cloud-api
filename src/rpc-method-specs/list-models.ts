import * as t from 'io-ts';
import { rpcModelVersionCodec } from '../rpc-model-version';

const Range = t.type({
  rangeMin: t.number,
  rangeMax: t.number,
});

const OperatingSystems = t.type({
  osx: t.boolean,
  windows: t.boolean,
  linux: t.boolean,
});

export const listModels = {
  description: 'List alwaysAI models',
  argsCodec: t.tuple([
    t.partial({
      publisher: t.array(t.string),
      frameworkType: t.array(t.string),
      categories: t.array(t.string),
      powerConsumption: Range,
      size: Range,
      license: t.array(t.string),
      inferenceTime: Range,
      board: t.string,
      dataSet: t.array(t.string),
      osCompatibility: OperatingSystems,
    }),
  ]),
  resultCodec: t.array(rpcModelVersionCodec),
};
