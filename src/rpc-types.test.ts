import { deserializeRpcResponse } from './rpc-types';

describe(deserializeRpcResponse.name, () => {
  it('returns a properly-typed clone of the input value', () => {
    const result = deserializeRpcResponse(JSON.stringify({ result: 'foo' }));
    expect(result).toBe('foo');
  });

  it('throws a validation error if the input is bad', () => {
    expect(() => deserializeRpcResponse('{}')).toThrow(/object does not have/i);
  });
});
