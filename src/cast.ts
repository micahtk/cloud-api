import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { CodedError } from '@carnesen/coded-error';

export function cast<A, O, I>(codec: t.Type<A, O, I>, i: I, code?: any) {
  const decoded = codec.decode(i);
  if (decoded.isLeft()) {
    const message = PathReporter.report(decoded).join('. ');
    throw new CodedError(message, code);
  }
  return decoded.value;
}
