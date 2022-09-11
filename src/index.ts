/* eslint-disable no-console */
import 'dotenv/config';
import { appFactory } from './app';
import { job } from './worker';

const app = appFactory();
const PORT = process.env.PORT || 4000;

job.start();
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}/`);
});
