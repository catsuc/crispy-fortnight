import { prisma } from "../../prisma/client";
import { IMessageRepository, MessageCreateData } from "../IMessageRepository";

export class PrismaMessageRepository implements IMessageRepository {
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
