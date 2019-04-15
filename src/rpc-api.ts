import * as t from 'io-ts';
import { rpcMethodSpecs } from './rpc-method-specs';

type Specs = typeof rpcMethodSpecs;

export type RpcApi = {
  [methodName in keyof Specs]: (
    ...args: t.TypeOf<Specs[methodName]['argsCodec']>
  ) => Promise<t.TypeOf<Specs[methodName]['resultCodec']>>
};
