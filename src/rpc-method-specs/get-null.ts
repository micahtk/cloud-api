import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';
import { RpcMethodSpec } from '../rpc-types';

export const getNull = RpcMethodSpec({
  description: 'Get the value "null" for testing purposes',
  argsCodec: c.emptyArray,
  resultCodec: t.null,
});
