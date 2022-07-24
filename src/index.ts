import 'dotenv/config';
import { serverFactory } from './server';
import './worker';

const PORT = process.env.PORT || 3333;
const server = serverFactory();

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
