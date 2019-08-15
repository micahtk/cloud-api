import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { rpcModelVersionCodec } from '../rpc-model-version';
import { rpcCreateModelVersionArg0Props } from './create-model-version';

const fileSpecificationCodec = t.type({ uuid: t.string, path: t.string });

export const rpcCreateModelVersionFromBlobsArg0Codec = t.type(
  {
    config_file: fileSpecificationCodec,
    label_file: fileSpecificationCodec,
    model_file: fileSpecificationCodec,
    metadata: t.type(rpcCreateModelVersionArg0Props),
  },
  'CreateModelVersionFromBlobsData',
);

export type RpcCreateModelVersionArg0 = t.TypeOf<
  typeof rpcCreateModelVersionFromBlobsArg0Codec
>;

export const createModelVersionFromBlobs = RpcMethodSpec({
  description: 'Publish a new alwaysAI model version',
  argsCodec: t.tuple([rpcCreateModelVersionFromBlobsArg0Codec], 'args'),
  resultCodec: rpcModelVersionCodec,
});
