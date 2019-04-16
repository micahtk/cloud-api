import { errorSpecs } from './error-specs';

export type ErrorCode = { [K in keyof typeof errorSpecs]: K };

const partial: any = {};
Object.keys(errorSpecs).forEach(code => {
  partial[code] = code;
});

export const ErrorCode: ErrorCode = partial;
