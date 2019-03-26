import * as t from 'io-ts';

export const getModel = {
  description: 'Get an alwaysAI model',
  argsCodec: t.tuple([t.type({ publisher: t.string, name: t.string })], 'args'),
  resultCodec: t.type(
    {
      publisher: t.string,
      name: t.string,
      uuid: t.string,
    },
    'result',
  ),
};
