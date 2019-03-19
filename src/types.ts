import * as t from 'io-ts';
import { Either, right, left } from 'fp-ts/lib/Either';

export type Config = {
  protocol: 'http' | 'https';
  hostname: string;
  username: string;
  password: string;
  port: number;
};

export const rpcRequestC = t.type({
  methodName: t.string,
  args: t.UnknownArray,
});

export type RpcRequest = t.TypeOf<typeof rpcRequestC>;

const rpcSuccessC = t.strict({
  result: t.any,
});

const rpcFailureC = t.type({
  message: t.string,
  code: t.any,
  data: t.any,
});

type RpcSuccess = t.TypeOf<typeof rpcSuccessC>;

type RpcFailure = t.TypeOf<typeof rpcFailureC>;

export function decodeRpcResponse(u: unknown): Either<RpcFailure, RpcSuccess> {
  const asFailure = rpcFailureC.decode(u);
  if (asFailure.isRight()) {
    return left(asFailure.value);
  }
  const asSuccess = rpcSuccessC.decode(u);
  if (asSuccess.isRight()) {
    return right(asSuccess.value);
  }
  throw new Error('Failed to parse as RPC response');
}

export const rpcResponseC = t.union([rpcFailureC, rpcSuccessC]);
