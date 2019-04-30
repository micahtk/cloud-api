import * as t from 'io-ts';

export const modelVersion = t.type(
  {
    publisher: t.string,
    name: t.string,
    version: t.string,
    description: t.string,
    accuracy: t.string,
    license: t.string,
    public: t.boolean,
    uuid: t.string,
    packageUrl: t.string,
  },
  'ModelVersion',
);
