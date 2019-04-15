import * as t from 'io-ts';
import { RpcMethodSpec } from '../rpc-types';

export const getModel = RpcMethodSpec({
  description: 'Get an alwaysAI model',
  argsCodec: t.tuple([t.type({ publisher: t.string, name: t.string })], 'args'),
  resultCodec: t.type(
    {
      publisher: t.string,
      name: t.string,
      uuid: t.string,
    },
    'result',
  ),
});
