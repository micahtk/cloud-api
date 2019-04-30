import * as s from 'http-status-codes';

export function ErrorSpec(opts: { httpStatus: number; message: string }) {
  return { ...opts };
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
  FORBIDDEN: ErrorSpec({
    httpStatus: s.FORBIDDEN,
    message: 'User is not authorized to perform this action',
  }),
  ID_TOKEN_EXPIRED: ErrorSpec({
    httpStatus: s.UNAUTHORIZED,
    message: 'ID token has expired',
  }),
  INVALID_TOKEN: ErrorSpec({
    httpStatus: s.UNAUTHORIZED,
    message: 'ID token is not valid',
  }),
  MODEL_VERSION_NOT_FOUND: ErrorSpec({
    httpStatus: s.NOT_FOUND,
    message: 'The specified model could not be found',
  }),
  MODEL_VERSION_ALREADY_EXISTS: ErrorSpec({
    httpStatus: s.CONFLICT,
    message: 'The model version already exists',
  }),
  UNEXPECTED_CONDITION: ErrorSpec({
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
