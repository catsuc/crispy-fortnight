import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { MessageRepository } from "../repositories/message-repository";

interface SendMailUseCaseRequest {
  targetDate: Date;
}

export class SendMailUseCase {
  constructor(
    private messageRepository: MessageRepository,
  ) {}

  async execute(request: SendMailUseCaseRequest) {
    const messages = await this.messageRepository.findMany({ targetDate: request.targetDate })
    for (let message of messages) {
      const nodemailer = new NodemailerMailAdapter();
      await nodemailer.sendMail({
        body: message.message,
        subject: "Cápsula do Tempo",
        to: message.targetEmail
      })
      // Salvar que foi enviado no banco de dados
    }
  }
}
