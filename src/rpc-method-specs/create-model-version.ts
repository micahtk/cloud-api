import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { rpcModelVersionCodec } from '../rpc-model-version';

const { props } = rpcModelVersionCodec;

export const rpcCreateModelVersionArg0Props = {
  accuracy: props.accuracy,
  dataset: props.dataset,
  description: props.description,
  id: props.description,
  inference_time: props.inference_time,
  license: props.license,
  mean_average_precision_top_1: props.mean_average_precision_top_1,
  mean_average_precision_top_5: props.mean_average_precision_top_5,
  model_parameters: props.model_parameters,
  public: props.public,
  website_url: props.website_url,
};

export const rpcCreateModelVersionArg0Codec = t.type(
  rpcCreateModelVersionArg0Props,
  'CreateModelVersionData',
);

export type RpcCreateModelVersionArg0 = t.TypeOf<typeof rpcCreateModelVersionArg0Codec>;

export const createModelVersion = RpcMethodSpec({
  description: 'Publish a new alwaysAI model version',
  argsCodec: t.tuple([rpcCreateModelVersionArg0Codec], 'args'),
  resultCodec: rpcModelVersionCodec,
});
