import * as t from 'io-ts';

export const createModel = {
  description: 'Create a new alwaysAI model',
  argsCodec: t.tuple([t.type({ publisher: t.string, shortName: t.string })], 'args'),
  resultCodec: t.type(
    {
      uuid: t.string,
    },
    'result',
  ),
};
