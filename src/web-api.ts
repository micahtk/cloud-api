import axios from 'axios';

export class WebApi {
  public href: string;
  public constructor(href: string) {
    this.href = href;
  }
  public async ping() {
    const res = await axios(`${this.href}/_ah/start`);
    return res.data;
  }
}
