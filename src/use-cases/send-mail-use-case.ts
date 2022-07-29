import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { MessageRepository } from "../repositories/message-repository";

interface SendMailUseCaseRequest {
  targetDate: Date;
}

export class SendMailUseCase {
  private nodemailer;
  constructor(
    private messageRepository: MessageRepository,
  ) {
    this.nodemailer = new NodemailerMailAdapter();
  }

  async execute(request: SendMailUseCaseRequest) {
    const messages = await this.messageRepository.findMany({ targetDate: request.targetDate })

    for (let message of messages) {
      await this.nodemailer.sendMail({
        body: message.message,
        subject: "Cápsula do Tempo",
        to: message.targetEmail
      })
      await this.messageRepository.update({ id: message.id, sentAt: new Date })
    }
  }
}
