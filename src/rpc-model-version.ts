import * as t from 'io-ts';

export const rpcModelVersionCodec = t.type(
  {
    accuracy: t.string,
    created_at: t.string,
    deleted: t.boolean,
    description: t.string,
    final: t.boolean,
    id: t.string,
    license: t.string,
    model_parameters: t.any,
    public: t.boolean,
    updated_at: t.string,
    uuid: t.string,
    version: t.number,
    website_url: t.string,
  },
  'RpcModelVersion',
);

export type RpcModelVersion = t.TypeOf<typeof rpcModelVersionCodec>;
