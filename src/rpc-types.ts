import * as t from 'io-ts';

import { rpcMethodSpecs } from './rpc-method-specs';

export const rpcRequestCodec = t.type({
  methodName: t.string,
  args: t.UnknownArray,
});

export type RpcRequest = t.TypeOf<typeof rpcRequestCodec>;

export type RpcSuccess = {
  result: any;
};

export type RpcFailure = {
  message: string;
  code?: string | number | null;
  data?: any;
};

type Specs = typeof rpcMethodSpecs;

export type RpcApi = {
  [methodName in keyof Specs]: (
    ...args: t.TypeOf<Specs[methodName]['argsCodec']>
  ) => Promise<t.TypeOf<Specs[methodName]['resultCodec']>>
};
