import { WebApiClient } from './web-api-client';

describe(WebApiClient.name, () => {
  it('constructs', () => {
    new WebApiClient('http://localhost');
  });
});
