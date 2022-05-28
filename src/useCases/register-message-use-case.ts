import { IMessageRepository } from "../repositories/IMessageRepository";

interface RegisterMessageUseCaseRequest {
  message: string;
  targetEmail: string;
  targetDate: number;
}

export class RegisterMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
  ) {}

  async execute(request: RegisterMessageUseCaseRequest) {
    const { message, targetEmail, targetDate } = request;

    if (!message) {
      throw new Error("Message is required");
    }
    if (!targetEmail) {
      throw new Error("TargetEmail is required");
    }
    if (Date.now() >= targetDate) {
      throw new Error("TargetDate is in the past or current time");
    }
    await this.messageRepository.create({ message, targetEmail, targetDate: new Date(targetDate) });
  }
}

