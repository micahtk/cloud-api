import * as t from 'io-ts';

import { emptyTupleCodec } from '../codecs/empty-tuple-codec';

export const listModels = {
  description: 'Create a new alwaysAI model',
  argsCodec: emptyTupleCodec,
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
