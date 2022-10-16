import { Request, Response } from 'express';
import * as yup from 'yup';
import { CreateMessageValidator, CreateMessageValidatorTypes } from '../libs/yup';
import { CreateMessageService } from '../services/create-message-service';

class CreateMessageController {
  private readonly service: CreateMessageService;
  private readonly messageValidator: yup.SchemaOf<CreateMessageValidatorTypes>;

  constructor(service: CreateMessageService) {
    this.service = service;
    this.execute = this.execute.bind(this);
    this.messageValidator = CreateMessageValidator
  }

  async execute(request: Request, response: Response): Promise<unknown> {
    const { message, targetDate: rawTargetDate, targetEmail } = request.body;

    const targetDate = new Date(rawTargetDate);

    try {
      this.messageValidator.validateSync({
        message,
        targetDate,
        targetEmail
      } as CreateMessageValidatorTypes, {
        abortEarly: false
      })
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        return response.status(400).json({ message: error.message })
      }
      return response.status(500);
    }

    this.service.execute({ message, targetDate, targetEmail });

    return response.status(201).json({ message: 'Message successfully registered' });
  }
}

export { CreateMessageController };

