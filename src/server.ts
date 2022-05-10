import 'dotenv/config'
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(process.env.PORT || 3333, () => { 
  console.log(`Server started on port ${process.env.port || 3333}`);
});