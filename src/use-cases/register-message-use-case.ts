import { IMessageRepository } from "../repositories/message-repository";

interface RegisterMessageUseCaseRequest {
  message: string;
  targetEmail: string;
  targetDate: Date;
}

export class RegisterMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
  ) {}

  async execute(request: RegisterMessageUseCaseRequest) {
    const { message, targetEmail, targetDate: rawTargetDate } = request;

    const targetDate = new Date(rawTargetDate)

    if (!message) {
      throw new Error("Message is required");
    }
    if (!targetEmail) {
      throw new Error("TargetEmail is required");
    }
    if (targetDate <= new Date()) {
      throw new Error("TargetDate is past or the current date")
    }
    await this.messageRepository.create({ message, targetEmail, targetDate });
  }
}
