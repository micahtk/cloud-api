import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';
import { RpcMethodSpec } from '../rpc-types';

export const throwError = RpcMethodSpec({
  description: 'Throw an error for testing purposes',
  argsCodec: t.tuple([c.optionalString, t.any, t.any], 'args'),
  resultCodec: t.unknown,
});
