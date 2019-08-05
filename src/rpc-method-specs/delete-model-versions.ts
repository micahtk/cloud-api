import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';

const argsCodec = t.tuple(
  [t.intersection([t.type({ id: t.string }), t.partial({ version: t.number })])],
  'args',
);

export const deleteModelVersions = RpcMethodSpec({
  description: 'Delete model versions',
  argsCodec,
  resultCodec: t.null,
});
