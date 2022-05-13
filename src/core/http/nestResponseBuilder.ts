import { NestResponse } from './nestResponse';

export class NestResponseBuilder {
  private res: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  status(status: number) {
    this.res.status = status;

    return this;
  }

  headers(headers: object) {
    this.res.headers = headers;

    return this;
  }

  body(body: object) {
    this.res.body = body;

    return this;
  }

  build() {
    return new NestResponse(this.res);
  }
}
