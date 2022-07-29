import { CronJob } from 'cron'
import { PrismaMessageRepository } from './repositories/prisma/prisma-message-repository';
import { SendMailUseCase } from './use-cases/send-mail-use-case';

const job = new CronJob(
  '*/1 * * * *',
  async () => {
    const prismaMessageRepository = new PrismaMessageRepository();
    const useCase = new SendMailUseCase(prismaMessageRepository)

    await useCase.execute({ targetDate: new Date })
  },
  null,
  true,
)

job.start();
