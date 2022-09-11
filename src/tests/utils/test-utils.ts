import { vi } from 'vitest';

class TestRequest {
  readonly body?: object;

  constructor(body?: object) {
    this.body = body;
  }
}

class TestResponse {
  status = vi.fn(() => this);

  json = vi.fn(() => Promise.resolve());
}

export { TestRequest, TestResponse };
