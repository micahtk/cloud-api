import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { rpcModelVersionWebCodec } from '../rpc-model-version-web';

const { props } = rpcModelVersionWebCodec;

export const rpcCreateModelVersionWebArg0Props = {
  accuracy: props.accuracy,
  benchmark: props.benchmark,
  categories: props.categories,
  dataset: props.dataset,
  dataset_url: props.dataset_url,
  description: props.description,
  id: props.description,
  inference_time: props.inference_time,
  labels: props.labels,
  license: props.license,
  mean_average_precision_top_1: props.mean_average_precision_top_1,
  mean_average_precision_top_5: props.mean_average_precision_top_5,
  media: props.media,
  model_parameters: props.model_parameters,
  public: props.public,
  website_url: props.website_url,
};

export const rpcCreateModelVersionWebArg0Codec = t.type(
  rpcCreateModelVersionWebArg0Props,
  'CreateModelVersionData',
);

export type RpcCreateModelVersionWebArg0 = t.TypeOf<
  typeof rpcCreateModelVersionWebArg0Codec
>;

export const createModelVersionWeb = RpcMethodSpec({
  description: 'Publish a new alwaysAI model version',
  argsCodec: t.tuple([rpcCreateModelVersionWebArg0Codec], 'args'),
  resultCodec: rpcModelVersionWebCodec,
});
