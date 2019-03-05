import { WebApi } from './web-api';

describe(WebApi.name, () => {
  it('constructs', () => {
    new WebApi('http://localhost');
  });
});
