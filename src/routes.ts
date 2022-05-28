import { Router } from 'express';
import { PrismaMessageRepository } from './repositories/prisma/PrismaMessageRepository';
import { RegisterMessageUseCase } from './useCases/register-message-use-case';

const routes = Router();

routes.post('/message', async (request, response) => {
  const { message, targetEmail, targetDate } = request.body;

  const prismaMessageRepository = new PrismaMessageRepository();

  const registerMessageUseCase = new RegisterMessageUseCase(
    prismaMessageRepository
  )

  await registerMessageUseCase.execute({ message, targetEmail, targetDate });
  return response.status(201).send("Message is registered");
});

export { routes };
