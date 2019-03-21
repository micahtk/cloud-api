import { RpcSuccess, RpcFailure } from './rpc-types';
import { CodedError } from '@carnesen/coded-error';

export const rpcResult = {
  serialize(result: any) {
    const serialized = JSON.stringify({ result });
    return serialized;
  },
  deserialize(serialized: string) {
    let parsed: any;
    try {
      parsed = JSON.parse(serialized);
    } catch (ex) {
      throw new CodedError(
        `Failed to parse JSON, "${ex.message || 'an known problem has occurred'}"`,
        'IS_NOT_JSON',
        serialized,
      );
    }
    if (typeof parsed !== 'object') {
      throw new Error('Expected argument to be an object');
    }
    const { result } = parsed as RpcSuccess;
    if (typeof result !== 'undefined') {
      return result;
    }
    const {
      message = 'Object does not have a result',
      code,
      data,
    } = parsed as RpcFailure;
    throw new CodedError(message, code, data);
  },
};
