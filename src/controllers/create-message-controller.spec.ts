import { afterEach, describe, expect, it, jest } from '@jest/globals';
import "../tests/utils/timer-mock";
import { Request, Response } from 'express';
import { CreateMessageService } from '../services/create-message-service';
import { TestRequest, TestResponse } from '../tests/utils/test-utils';
import { CreateMessageController } from './create-message-controller';

const serviceMock = {
  execute: jest.fn<typeof CreateMessageService.prototype.execute>().mockResolvedValue(),
} as CreateMessageService;

describe('CreateMessageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
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
      targetDate: '2022-10-14',
      targetEmail: 'targetEmail@targetEmail.com',
    };

    const expectedOutput = { ...input, targetDate: new Date(input.targetDate) };

    const request = new TestRequest(input);
    const response = new TestResponse();

    await controller.execute(request as Request, response as any as Response);

    expect(serviceMock.execute).toBeCalledTimes(1);
    expect(serviceMock.execute).toBeCalledWith(expectedOutput);
  });

  it('should return a message with 201 status code', async () => {
    const controller = new CreateMessageController(serviceMock);

    const input = {
      message: 'message',
      targetDate: '2022-10-14',
      targetEmail: 'targetEmail@targetEmail.com',
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
    it('should return a error message with status 400 when body is invalid', async () => {
      const controller = new CreateMessageController(serviceMock);

      const expectedOutput = {
        message: [
          "message is a required field",
          "targetEmail is a required field",
          "targetDate is a required field",
        ]
      };

      const request = new TestRequest({});
      const response = new TestResponse();

      await controller.execute(request as Request, response as any as Response);

      expect(response.status).toBeCalledWith(400);
      expect(response.status).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(expectedOutput);
      expect(response.json).toBeCalledTimes(1);
    });
    it('should return a error message with status 400 when email is invalid', async () => {
      const controller = new CreateMessageController(serviceMock);

      const input = {
        message: 'message',
        targetDate: '2022-10-14',
        targetEmail: 'invalidEmail',
      };

      const expectedOutput = {
        message: [
          "targetEmail must be a valid email",
        ]
      }

      const request = new TestRequest(input);
      const response = new TestResponse();

      await controller.execute(request as Request, response as any as Response);

      expect(response.status).toBeCalledWith(400);
      expect(response.status).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(expectedOutput);
      expect(response.json).toBeCalledTimes(1);
    })

    it('should return an error message with status 400 when message not contain more than 4 characters', async() => {
      const controller = new CreateMessageController(serviceMock);

      const input = {
        message: Array.from({ length: 3 }, () => 'A').join(''),
        targetDate: '2022-10-14',
        targetEmail: 'targetEmail@targetEmail.com',
      };

      const expectedOutput = {
        message: [
          "message must be at least 4 characters",
        ]
      }

      const request = new TestRequest(input);
      const response = new TestResponse();

      await controller.execute(request as Request, response as any as Response);

      expect(response.status).toBeCalledWith(400);
      expect(response.status).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(expectedOutput);
      expect(response.json).toBeCalledTimes(1);
    })

    it('should return an error message with status 400 when the message contains more than 256 characters', async () => {
      const controller = new CreateMessageController(serviceMock);

      const input = {
        message: Array.from({ length: 257 }, () => 'A').join(''),
        targetDate: '2022-10-14',
        targetEmail: 'targetEmail@targetEmail.com',
      };

      const expectedOutput = {
        message: [
          "message must be at most 256 characters",
        ]
      }

      const request = new TestRequest(input);
      const response = new TestResponse();

      await controller.execute(request as Request, response as any as Response);

      expect(response.status).toBeCalledWith(400);
      expect(response.status).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(expectedOutput);
      expect(response.json).toBeCalledTimes(1);
    })

    it('should return an error message with status 400 when targetDate in the past', async () => {
      const controller = new CreateMessageController(serviceMock);

      const input = {
        message: "message",
        targetDate: '2022-10-12',
        targetEmail: 'targetEmail@targetEmail.com',
      };

      const expectedOutput = {
        message: [
          "targetDate field must be later than 2022-10-13T00:00:00.000Z",
        ]
      }

      const request = new TestRequest(input);
      const response = new TestResponse();

      await controller.execute(request as Request, response as any as Response);

      expect(response.status).toBeCalledWith(400);
      expect(response.status).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(expectedOutput);
      expect(response.json).toBeCalledTimes(1);
    })
  });
});
