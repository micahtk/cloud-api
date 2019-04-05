import * as t from '@alwaysai/codecs';

export const getUser = {
  description: 'Get a user by username',
  argsCodec: t.tuple(
    [
      t.type({
        username: t.string,
      }),
    ],
    'args',
  ),
  resultCodec: t.type(
    {
      username: t.string,
      uuid: t.uuid,
      firstName: t.nullableString,
      lastName: t.nullableString,
      createdAt: t.string,
    },
    'result',
  ),
};
