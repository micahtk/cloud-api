import * as t from '@alwaysai/codecs';

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
