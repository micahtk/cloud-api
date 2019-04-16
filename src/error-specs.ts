import * as s from 'http-status-codes';

export function ErrorSpec(opts: { httpStatus: number; message: string }) {
  return { ...opts };
}

const UNEXPECTED_CONDITION = 'UNEXPECTED_CONDITION';

export function findErrorSpec(maybeCode: string) {
  return errorSpecs.hasOwnProperty(maybeCode)
    ? { code: maybeCode, spec: errorSpecs[maybeCode as keyof typeof errorSpecs] }
    : { code: UNEXPECTED_CONDITION, spec: errorSpecs[UNEXPECTED_CONDITION] };
}

export const errorSpecs = {
  AUTHENTICATION_REQUIRED: ErrorSpec({
    httpStatus: s.UNAUTHORIZED,
    message: 'Authentication is required',
  }),
  EMAIL_ALREADY_EXISTS: ErrorSpec({
    httpStatus: s.CONFLICT,
    message: 'The email address is already in use by another account',
  }),
  ID_TOKEN_EXPIRED: ErrorSpec({
    httpStatus: s.UNAUTHORIZED,
    message: 'ID token has expired',
  }),
  MODEL_NOT_FOUND: ErrorSpec({
    httpStatus: s.NOT_FOUND,
    message: 'The specified model could not be found',
  }),
  MODEL_ALREADY_EXISTS: ErrorSpec({
    httpStatus: s.CONFLICT,
    message: 'The model is already in use by another account',
  }),
  [UNEXPECTED_CONDITION]: ErrorSpec({
    httpStatus: s.INTERNAL_SERVER_ERROR,
    message: 'Encountered an unexpected condition',
  }),
  USERNAME_ALREADY_EXISTS: ErrorSpec({
    httpStatus: s.CONFLICT,
    message: 'The username is already in use by another account',
  }),
  USERNAME_NOT_FOUND: ErrorSpec({
    httpStatus: s.NOT_FOUND,
    message: 'The specified username could not be found',
  }),
};
