import { CreateMessageController } from './create-message-controller';
import { CreateMessageService } from '../services/create-message-service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { TestRequest, TestResponse } from '../tests/utils/test-utils';

const serviceMock: CreateMessageService = {
  execute: jest.fn<typeof CreateMessageService.prototype.execute>().mockResolvedValue(),
} as CreateMessageService;

describe('CreateMessageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    const controller = new CreateMessageController(serviceMock);

    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(CreateMessageController);
  });

  it('should have an execute method', () => {
    const controller = new CreateMessageController(serviceMock);

    expect(controller.execute).toBeDefined();
    expect(controller.execute).toBeInstanceOf(Function);
  });

  it('should call CreateMessageService.execute when called', async () => {
    const controller = new CreateMessageController(serviceMock);

    const input = {
      message: 'message',
      targetDate: 'targetDate',
      targetEmail: 'targetEmail',
    };

    const request = new TestRequest(input);
    const response = new TestResponse();

    await controller.execute(request as Request, response as any as Response);

    expect(serviceMock.execute).toBeCalledTimes(1);
    expect(serviceMock.execute).toBeCalledWith(input);
  });

  it('should return a message with 201 status code', async () => {
    const controller = new CreateMessageController(serviceMock);

    const input = {
      message: 'message',
      targetDate: 'targetDate',
      targetEmail: 'targetEmail',
    };

    const expectedOutput = { message: 'Message successfully registered' };

    const request = new TestRequest(input);
    const response = new TestResponse();

    await controller.execute(request as Request, response as any as Response);

    expect(response.status).toBeCalledWith(201);
    expect(response.status).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(expectedOutput);
    expect(response.json).toBeCalledTimes(1);
  });

  describe('error cases', () => {
    it.todo('should return a error message with status 400 when body is invalid');
  });
});
