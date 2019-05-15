import * as t from 'io-ts';

import { RpcMethodSpec } from '../rpc-types';
import { modelVersion } from '../codecs/model-version';

const { uuid, packageUrl, final, ...restProps } = modelVersion.props;

export const createModelVersion = RpcMethodSpec({
  description: 'Publish a new alwaysAI model',
  argsCodec: t.tuple([t.type({ ...restProps }, 'ModelVersion')], 'args'),
  resultCodec: modelVersion,
});
