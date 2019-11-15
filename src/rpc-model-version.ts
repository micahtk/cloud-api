import * as t from 'io-ts';

export const rpcModelVersionCodec = t.type(
  {
    accuracy: t.string,
    benchmark: t.union([t.any, t.null]),
    categories: t.union([t.any, t.null]),
    created_at: t.string,
    dataset: t.string,
    dataset_url: t.union([t.any, t.null]),
    deleted: t.boolean,
    deprecated: t.boolean,
    description: t.string,
    failed: t.boolean,
    final: t.boolean,
    id: t.string,
    inference_time: t.union([t.number, t.null]),
    labels: t.union([t.any, t.null]),
    license: t.string,
    mean_average_precision_top_1: t.union([t.number, t.null]),
    mean_average_precision_top_5: t.union([t.number, t.null]),
    media: t.union([t.any, t.null]),
    model_parameters: t.any,
    public: t.boolean,
    size: t.number,
    updated_at: t.string,
    uuid: t.string,
    version: t.number,
    website_url: t.string,
  },
  'RpcModelVersion',
);

export type RpcModelVersion = t.TypeOf<typeof rpcModelVersionCodec>;
