import * as t from 'io-ts';

function isEmptyTuple(u: unknown): u is [] {
  return Array.isArray(u) && u.length === 0;
}

export const emptyTupleCodec = new t.Type<[]>(
  'args',
  isEmptyTuple,
  (u, c) => (isEmptyTuple(u) ? t.success(u) : t.failure(u, c)),
  t.identity,
);
