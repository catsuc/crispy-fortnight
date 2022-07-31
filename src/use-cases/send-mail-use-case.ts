import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { MessageRepository } from "../repositories/message-repository";

interface SendMailUseCaseRequest {
  targetDate: Date;
}

export class SendMailUseCase {
  constructor(
    private messageRepository: MessageRepository,
    private nodemailer = new NodemailerMailAdapter()
  ) {}

  async execute(request: SendMailUseCaseRequest) {
    const messages = await this.messageRepository.findMany({ targetDate: request.targetDate })

    for (let message of messages) {
      await this.nodemailer.sendMail({
        subject: "Cápsula do Tempo",
        to: message.targetEmail,
        body: message.message,
      })
      await this.messageRepository.update({ id: message.id, sentAt: new Date })
    }
  }
}
