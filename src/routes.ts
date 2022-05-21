import { Router } from 'express';

const routes = Router();

routes.get('/', (_request, response) => {
  return response.send('Hello World!');
});

export { routes };
