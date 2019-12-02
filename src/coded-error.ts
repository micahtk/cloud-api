export class CodedError extends Error {
  public readonly code?: any;
  public readonly data?: any;
  constructor(message?: string, code?: any, data?: any) {
    super(message);
    if (typeof code !== 'undefined') {
      this.code = code;
    }
    if (typeof data !== 'undefined') {
      this.data = data;
    }
    if (typeof this.stack === 'string') {
      this.stack = `${this.stack}\n`;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
