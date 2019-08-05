import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { rpcModelVersionCodec } from '../rpc-model-version';

const {
  uuid,
  final,
  created_at,
  version,
  deleted,
  updated_at,
  ...restProps
} = rpcModelVersionCodec.props;
// ^^ These fields are assigned by the back end

export const rpcCreateModelVersionArg0Codec = t.type(
  { ...restProps },
  'CreateModelVersionData',
);

export type RpcCreateModelVersionArg0 = t.TypeOf<typeof rpcCreateModelVersionArg0Codec>;

export const createModelVersion = RpcMethodSpec({
  description: 'Publish a new alwaysAI model version',
  argsCodec: t.tuple([rpcCreateModelVersionArg0Codec], 'args'),
  resultCodec: rpcModelVersionCodec,
});
