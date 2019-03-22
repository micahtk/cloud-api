import * as t from 'io-ts';
import { CodedError } from '@carnesen/coded-error';
import parseJson = require('parse-json');
import { JSONTypeRT, JSONType } from 'io-ts-types/lib/JSON/JSONTypeRT';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import { cast } from './cast';
import { rpcMethodSpecs } from './rpc-method-specs';

export const rpcRequestCodec = t.type({
  methodName: t.string,
  args: t.UnknownArray,
});

export type RpcRequest = t.TypeOf<typeof rpcRequestCodec>;

export type RpcResult = {
  result: JSONType;
};

export type RpcError = {
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

function parseJsonWithCodedError(serialized: string) {
  let parsed: any;
  try {
    parsed = parseJson(serialized);
  } catch (ex) {
    throw new CodedError(ex.message || 'Failed to parse JSON', BAD_REQUEST, serialized);
  }
  return parsed;
}

export function deserializeRpcResponse(serialized: string) {
  const parsed = parseJsonWithCodedError(serialized);
  if (typeof parsed !== 'object') {
    throw new Error('Expected argument to be an object');
  }

  const { result } = parsed as RpcResult;
  if (typeof result !== 'undefined') {
    return result;
  }

  const { message = 'Object does not have a result', code, data } = parsed as RpcError;
  throw new CodedError(message, code, data);
}

export async function handleRpcRequest(serialized: string, rpcApi: RpcApi) {
  const parsed = parseJsonWithCodedError(serialized);
  const rpcRequest = cast(rpcRequestCodec, parsed, BAD_REQUEST);
  const methodName = rpcRequest.methodName as keyof typeof rpcApi;
  const method = rpcApi[methodName];
  if (typeof method === 'undefined') {
    throw new CodedError(`Method not found "${methodName}"`, NOT_FOUND);
  }
  const methodReturnValue = await (method as any)(...rpcRequest.args);
  const returnValueAsSerializable = cast(JSONTypeRT, methodReturnValue);
  const rpcMethodSpec = rpcMethodSpecs[methodName];
  const result: JSONType = cast(
    rpcMethodSpec.resultCodec as any,
    returnValueAsSerializable,
  );
  const rpcResult: RpcResult = { result };
  return rpcResult;
}
