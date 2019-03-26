import * as t from 'io-ts';
import { nullableString } from '../codecs/string-codecs';

export const createUser = {
  description: 'Create a new alwaysAI user',
  argsCodec: t.tuple(
    [t.type({ username: t.string, emailAddress: nullableString, password: t.string })],
    'args',
  ),
  resultCodec: t.type(
    {
      uuid: t.string,
    },
    'result',
  ),
};
