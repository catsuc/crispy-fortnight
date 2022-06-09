import { prisma } from "../../prisma/client";
import { MessageRepository, MessageCreateData } from "../message-repository";

export class PrismaMessageRepository implements MessageRepository {
  async create({ message, targetDate, targetEmail }: MessageCreateData): Promise<void> {
    await prisma.message.create({
      data: {
        message,
        targetDate,
        targetEmail,
      },
    });
  }
}
