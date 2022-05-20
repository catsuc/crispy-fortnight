import express from 'express';

import { routes } from './routes';

function serverFactory(): express.Express {
  const server = express();

  server.use(routes);

  return server;
}

export { serverFactory };
