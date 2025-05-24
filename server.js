import express from 'express';
// import { PORT } from './config/index.js';
import routes from './Router/index.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',routes)
// // app.use('/apis', routes);

app.listen(4555, () => {
  console.log('Server is working on port3000');
});
