import * as t from '@alwaysai/codecs';

export const listModels = {
  description: 'Create a new alwaysAI model',
  argsCodec: t.emptyArray,
  resultCodec: t.array(
    t.type(
      {
        publisher: t.string,
        name: t.string,
        uuid: t.string,
      },
      'result',
    ),
  ),
};
