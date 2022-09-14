import 'dotenv/config';

import { serverFactory } from './server';
import { job } from './worker';

const PORT = process.env.PORT || 3333;
const server = serverFactory();

job.start();

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}/`);
});
