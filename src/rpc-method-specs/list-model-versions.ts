import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';
import { modelVersion } from '../codecs/model-version';

export const listModelVersions = {
  description: 'List alwaysAI model versions',
  argsCodec: c.emptyArray,
  resultCodec: t.array(modelVersion),
};
