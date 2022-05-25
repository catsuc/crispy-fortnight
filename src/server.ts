import express from 'express';
import cors from 'cors';

import { routes } from './routes';

function serverFactory(): express.Express {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(routes);

  return server;
}

export { serverFactory };
