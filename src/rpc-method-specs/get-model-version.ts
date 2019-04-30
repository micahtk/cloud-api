import * as t from 'io-ts';
import { RpcMethodSpec } from '../rpc-types';
import { modelVersion } from '../codecs/model-version';

const argsCodec = t.tuple(
  [
    t.intersection([
      t.type({ publisher: t.string, name: t.string }),
      t.partial({ version: t.string }),
    ]),
  ],
  'args',
);

export const getModelVersion = RpcMethodSpec({
  description: 'Get an alwaysAI model',
  argsCodec,
  resultCodec: modelVersion,
});
