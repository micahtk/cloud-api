import { ErrorCode } from './error-code';

describe('Error Codes', () => {
  it('is an object of error codes', () => {
    expect(ErrorCode.AUTHENTICATION_REQUIRED).toBe('AUTHENTICATION_REQUIRED');
  });
});
