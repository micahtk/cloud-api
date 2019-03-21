import { emptyTuple } from './empty-tuple';

describe(emptyTuple.name, () => {
  it('decodes a "right" if input is an empty array', () => {
    const decoded = emptyTuple.decode([]);
    expect(decoded.isRight()).toBe(true);
  });

  it('decodes a "left" if input is a non-empty array', () => {
    const decoded = emptyTuple.decode(['foo']);
    expect(decoded.isLeft()).toBe(true);
  });
});
