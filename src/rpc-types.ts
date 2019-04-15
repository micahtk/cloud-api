import * as t from 'io-ts';

export const rpcRequestCodec = t.type({
  methodName: t.string,
  args: t.UnknownArray,
});

export type RpcRequest = t.TypeOf<typeof rpcRequestCodec>;

export type RpcResult = {
  result: any;
};

export type RpcError = {
  message: string;
  code?: string | number | null;
  data?: any;
  stack?: string;
};

export type RpcMethodSpec<T, U> = {
  description: string;
  argsCodec: T;
  resultCodec: U;
};

export function RpcMethodSpec<T, U>(opts: {
  description: string;
  argsCodec: T;
  resultCodec: U;
}) {
  const spec: RpcMethodSpec<T, U> = { ...opts };
  return spec;
}

export const getVersionSpec = RpcMethodSpec({
  description: 'Get version information about this software',
  argsCodec: t.tuple([t.string]),
  resultCodec: t.type(
    {
      version: t.string,
      gitCommitHash: t.string,
      gitDiffHash: t.string,
    },
    'result',
  ),
});
