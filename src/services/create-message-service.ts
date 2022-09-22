import { prisma } from "../libs/prisma";

interface CreateMessageServiceRequest {
  message: string;
  targetDate: Date;
  targetEmail: string;
}

class CreateMessageService {
  async execute(data: CreateMessageServiceRequest): Promise<void> {
    const { message, targetDate, targetEmail } = data;

    await prisma.message.create({
      data: {
        message,
        targetDate: new Date(targetDate),
        targetEmail,
      },
    });
  }
}

export { CreateMessageService };
