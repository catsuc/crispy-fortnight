import express from 'express';

function serverFactory(): express.Express {
  const server = express();

  return server;
}

export { serverFactory };
