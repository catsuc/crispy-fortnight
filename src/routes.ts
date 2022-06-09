import { Router } from 'express';
import { PrismaMessageRepository } from './repositories/prisma/prisma-message-repository';
import { RegisterMessageUseCase } from './use-cases/register-message-use-case';

const routes = Router();

routes.post('/message', async (request, response) => {
  const { message, targetEmail, targetDate } = request.body;

  const prismaMessageRepository = new PrismaMessageRepository();

  const registerMessageUseCase = new RegisterMessageUseCase(
    prismaMessageRepository,
  );

  await registerMessageUseCase.execute({ message, targetEmail, targetDate });
  return response.status(201).send("Registered message");
});

export { routes };
