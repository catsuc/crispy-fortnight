import { CreateMessageService } from '@services/create-message-service';
import { Request, Response } from 'express';

class CreateMessageController {
  private readonly service: CreateMessageService;

  constructor(service: CreateMessageService) {
    this.service = service;
    this.execute = this.execute.bind(this);
  }

  async execute(request: Request, response: Response): Promise<unknown> {
    const { message, targetDate, targetEmail } = request.body;

    /** @todo validate received data */

    this.service.execute({ message, targetDate, targetEmail });

    return response.status(201).json({ message: 'Message successfully registered' });
  }
}

export { CreateMessageController };
