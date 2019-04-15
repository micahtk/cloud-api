import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';

export const listModels = {
  description: 'Create a new alwaysAI model',
  argsCodec: c.emptyArray,
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
