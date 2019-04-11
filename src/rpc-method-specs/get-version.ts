import * as t from '@alwaysai/codecs';

export const getVersion = {
  description: 'Get version information about this software',
  argsCodec: t.emptyArray,
  resultCodec: t.type(
    {
      version: t.string,
      gitCommitHash: t.string,
      gitDiffHash: t.string,
    },
    'result',
  ),
};
