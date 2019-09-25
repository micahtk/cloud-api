/// <reference lib="dom" />

import { cast } from '@alwaysai/codecs';

import { CodedError } from '@carnesen/coded-error';
import { ErrorCode } from './error-code';
import { SystemId, CLOUD_API_RPC_PATH } from './constants';
import { CloudApiUrl } from './cloud-api-url';
import { RpcApi } from './rpc-api';
import { rpcMethodSpecs } from './rpc-method-specs';
import { RpcRequest, RpcResult, RpcError } from './rpc-types';

type Raw = (data: any) => Promise<any>;

export function RpcClient(config: {
  getAuthorizationHeader: () => Promise<{ Authorization: string }>;
  systemId: SystemId;
}): RpcApi & { raw: Raw } {
  const { systemId, getAuthorizationHeader: getAuthorizationHeader } = config;
  const cloudApiUrl = CloudApiUrl(systemId);
  const href = `${cloudApiUrl}${CLOUD_API_RPC_PATH}`;

  const raw: Raw = async data => {
    const authorizationHeader = await getAuthorizationHeader();
    const serialized = JSON.stringify(data, null, 2);
    const response = await fetch(href, {
      method: 'POST',
      body: JSON.stringify(data, null, 2),
      headers: {
        ...authorizationHeader,
        'Content-Length': serialized.length.toString(),
        'Content-Type': 'application/json',
      },
    });

    const parsed = await response.json();
    return parsed;
  };

  const rpcClient: any = { raw };

  for (const [methodName, { argsCodec }] of Object.entries(rpcMethodSpecs)) {
    rpcClient[methodName] = async (...rawArgs: unknown[]) => {
      // Client-side runtime validation of args
      const args = cast(argsCodec as any, rawArgs);
      // Prepare request
      const rpcRequest: RpcRequest = {
        methodName,
        args: args as unknown[],
      };

      const parsed = await raw(rpcRequest);
      if (typeof parsed !== 'object') {
        throw new CodedError(
          'Expected argument to be an object',
          ErrorCode.NOT_AN_OBJECT,
          parsed,
        );
      }

      // Return payload's "result" field if it has one
      const { result } = parsed as RpcResult;
      if (typeof result !== 'undefined') {
        return result;
      }

      // Payload did not have a result. Throw an error instead.
      const {
        message = 'No result in RPC response',
        code = ErrorCode.NO_CODE_IN_ERROR_RESPONSE,
        data,
      } = parsed as RpcError;
      throw new CodedError(message, code, data);
    };
  }
  return rpcClient;
}
