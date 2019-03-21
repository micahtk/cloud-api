import { rpcResult } from './rpc-result';

describe(rpcResult.deserialize.name, () => {
  it('returns a properly-typed clone of the input value', () => {
    const result = rpcResult.deserialize(JSON.stringify({ result: 'foo' }));
    expect(result).toBe('foo');
  });

  it('throws a validation error if the input is bad', () => {
    expect(() => rpcResult.deserialize('{}')).toThrow(/object does not have/i);
  });
});
