import * as t from 'io-ts';

export const rpcModelVersionCodec = t.type(
  {
    accuracy: t.string,
    created_at: t.string,
    deleted: t.boolean,
    description: t.string,
    final: t.boolean,
    id: t.string,
    inference_time: t.union([t.number, t.null]),
    license: t.string,
    mean_average_precision_top_1: t.union([t.number, t.null]),
    mean_average_precision_top_5: t.union([t.number, t.null]),
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
