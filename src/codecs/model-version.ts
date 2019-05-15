import * as t from 'io-ts';

export const modelVersion = t.type(
  {
    id: t.string,
    version: t.string,
    description: t.string,
    accuracy: t.string,
    license: t.string,
    public: t.boolean,
    uuid: t.string,
    packageUrl: t.string,
    purpose: t.string,
    final: t.boolean,
  },
  'ModelVersion',
);

export type ModelVersion = t.TypeOf<typeof modelVersion>;
