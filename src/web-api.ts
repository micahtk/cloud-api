import * as t from 'io-ts';
import { specs } from './specs';

type Specs = typeof specs;

export type WebApi = {
  [methodName in keyof Specs]: (
    ...args: t.TypeOf<Specs[methodName]['argsC']>
  ) => Promise<t.TypeOf<Specs[methodName]['resultC']>>
};
