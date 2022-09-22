import { jest } from '@jest/globals';

class TestRequest {
  readonly body?: object;

  constructor(body?: object) {
    this.body = body;
  }
}

class TestResponse {
  status = jest.fn(() => this);

  json = jest.fn(() => Promise.resolve());
}

export { TestRequest, TestResponse };
