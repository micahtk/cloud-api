import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';

export function cast<A, O, I>(codec: t.Type<A, O, I>) {
  return function(i: I) {
    const decoded = codec.decode(i);
    if (decoded.isLeft()) {
      const message = PathReporter.report(decoded).join('. ');
      throw new Error(message);
    }
    return decoded.value;
  };
}
