import * as t from '@alwaysai/codecs';

export const createUser = {
  description: 'Create a new alwaysAI user',
  argsCodec: t.tuple(
    [
      t.type({
        username: t.string,
        emailAddress: t.nullableString,
        password: t.string,
      }),
    ],
    'args',
  ),
  resultCodec: t.type(
    {
      uuid: t.string,
    },
    'result',
  ),
};
