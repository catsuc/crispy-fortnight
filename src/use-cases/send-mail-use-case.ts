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
      console.log(message.id + " esse e o id da mensagem que vai ser enviada!")
      // Envio da mensagem
      // Salvar que foi enviado no banco de dados
    }
  }
}
