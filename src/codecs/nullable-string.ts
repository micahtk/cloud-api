import * as t from 'io-ts';

export const nullableString = t.union([t.string, t.null], 'nullableString');
