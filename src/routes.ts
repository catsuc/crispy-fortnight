import { CreateMessageController } from './controllers/create-message-controller';
import { CreateMessageService } from './services/create-message-service';
import express from 'express';

const createMessageController = new CreateMessageController(new CreateMessageService());

const routes = express.Router();

routes.post('/messages', createMessageController.execute);

export { routes };
