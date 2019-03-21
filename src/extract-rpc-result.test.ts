import { extractRpcResult } from './extract-rpc-result';

describe(extractRpcResult.name, () => {
  it('returns a properly-typed clone of the input value', () => {
    const result = extractRpcResult({ result: 'foo' });
    expect(result).toBe('foo');
  });

  it('throws a validation error if the input is bad', () => {
    expect(() => extractRpcResult({})).toThrow(/object does not have/i);
  });
});
