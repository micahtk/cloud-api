import { emptyTupleCodec } from './empty-tuple-codec';

describe(emptyTupleCodec.name, () => {
  it('decodes a "right" if input is an empty array', () => {
    const decoded = emptyTupleCodec.decode([]);
    expect(decoded.isRight()).toBe(true);
  });

  it('decodes a "left" if input is a non-empty array', () => {
    const decoded = emptyTupleCodec.decode(['foo']);
    expect(decoded.isLeft()).toBe(true);
  });
});
