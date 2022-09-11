import cors from 'cors';
import express from 'express';
import { routes } from './routes';

function appFactory(): express.Express {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(routes);

  return app;
}

export { appFactory };
