import { errorSpecs } from './error-specs';

export type ErrorCode = { [K in keyof typeof errorSpecs]: K };

export const ErrorCode: ErrorCode = (() => {
  const partial: any = {};
  Object.keys(errorSpecs).forEach(code => {
    partial[code] = code;
  });
  return partial;
})();
