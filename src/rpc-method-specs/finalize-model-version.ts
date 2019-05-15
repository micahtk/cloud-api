import * as t from 'io-ts';

import { uuid } from '@alwaysai/codecs';

import { RpcMethodSpec } from '../rpc-types';

const argsCodec = t.tuple([uuid], 'arg');

export const finalizeModelVersion = RpcMethodSpec({
  description: 'Set "final" to true on a model version',
  argsCodec,
  resultCodec: t.null,
});
