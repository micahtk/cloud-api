import * as t from 'io-ts';

export const nullableString = t.union([t.string, t.null], 'nullableString');
export const optionalString = t.union([t.string, t.undefined], 'optionalString');
