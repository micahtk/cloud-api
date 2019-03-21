import { RpcSuccess, RpcFailure } from './rpc-types';
import { CodedError } from '@carnesen/coded-error';

export function extractRpcResult(obj: unknown) {
  if (typeof obj !== 'object') {
    throw new Error('Expected argument to be an object');
  }
  const { result } = obj as RpcSuccess;
  if (typeof result !== 'undefined') {
    return result;
  }
  const { message = 'Object does not have a result', code, data } = obj as RpcFailure;
  throw new CodedError(message, code, data);
}
