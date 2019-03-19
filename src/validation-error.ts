import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { Either } from 'fp-ts/lib/Either';

export class ValidationError extends Error {
  constructor(decoded: Either<t.Errors, any>) {
    const message = PathReporter.report(decoded).join('. ');
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
