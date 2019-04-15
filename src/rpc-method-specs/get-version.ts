import * as t from 'io-ts';
import * as c from '@alwaysai/codecs';

import { RpcMethodSpec } from '../rpc-types';

export const getVersion = RpcMethodSpec({
  description: 'Get version information about this software',
  argsCodec: c.emptyArray,
  resultCodec: t.type(
    {
      version: t.string,
      gitCommitHash: t.string,
      gitDiffHash: t.string,
    },
    'result',
  ),
});
