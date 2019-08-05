import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';

// TODO: arg0 is uuid
const argsCodec = t.tuple([t.string], 'arg');

export const finalizeModelVersion = RpcMethodSpec({
  description: 'Set "final" to true on a model version',
  argsCodec,
  resultCodec: t.null,
});
