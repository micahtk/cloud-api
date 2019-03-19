import * as t from 'io-ts';

function isEmptyArray(u: unknown): u is [] {
  return Array.isArray(u) && u.length === 0;
}

const emptyTupleC = new t.Type<[]>(
  'EmptyArray',
  isEmptyArray,
  (u, c) => (isEmptyArray(u) ? t.success(u) : t.failure(u, c)),
  t.identity,
);

const nullableString = t.union([t.string, t.null], 'nullableString');

export const specs = {
  createUser: {
    description: 'Create a new alwaysAI user',
    argsC: t.tuple([
      t.type({ username: t.string, emailAddress: nullableString, password: t.string }),
    ]),
    resultC: t.type({
      uuid: t.string,
    }),
  },

  getNull: {
    description: 'Get the value "null" for testing purposes',
    argsC: emptyTupleC,
    resultC: t.null,
  },

  getUser: {
    description: 'Get a user by username',
    argsC: t.tuple([t.type({ username: t.string })]),
    resultC: t.type({
      username: t.string,
      emailAddress: t.union([t.string, t.null]),
    }),
  },

  throwError: {
    description: 'Throw an error for testing purposes',
    argsC: t.tuple([t.string, t.any, t.any]),
    resultC: t.unknown,
  },
};
