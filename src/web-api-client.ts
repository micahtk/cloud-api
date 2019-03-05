import axios from 'axios';

export class WebApiClient {
  public href: string;
  public constructor(href: string) {
    this.href = href;
  }
  public async ping() {
    await axios(`${this.href}/_ah/start`);
  }
}
