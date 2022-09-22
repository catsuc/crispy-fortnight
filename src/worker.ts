/* eslint-disable no-await-in-loop */
import { CronJob } from 'cron';
import { prisma } from './libs/prisma';
import { SendMailService } from './services/send-message-mail-service';

async function handler() {
  const sendMailService = new SendMailService();
  const messages = await prisma.message.findMany({
    take: 98,
    where: {
      targetDate: {
        lte: new Date(),
      },
      sentAt: null,
    },
  });

  for (const { id, message, targetEmail } of messages) {
    await sendMailService.execute({ message, to: targetEmail });
    await prisma.message.update({
      data: {
        sentAt: new Date(),
      },
      where: {
        id,
      },
    });
  }
}

const job = new CronJob('0 8/24 * * *', handler);

export { job };
