import { CreateMessageService } from '../services/create-message-service';
import { Request, Response } from 'express';

class CreateMessageController {
  private readonly service: CreateMessageService;

  constructor(service: CreateMessageService) {
    this.service = service;
    this.execute = this.execute.bind(this);
  }

  async execute(request: Request, response: Response): Promise<unknown> {
    const { message, targetDate: rawTargetDate, targetEmail } = request.body;

    const targetDate = new Date(rawTargetDate);

    if (!message || !targetDate || !targetDate) {
      return response.status(400).json({ message: 'Invalid request body' });
    }

    if (targetDate <= new Date()) {
      return response
        .status(400)
        .json({ message: 'Target date cannot be less than or equal to now' });
    }

    this.service.execute({ message, targetDate, targetEmail });

    return response.status(201).json({ message: 'Message successfully registered' });
  }
}

export { CreateMessageController };
