import express, { Express } from 'express';
import dotenv from 'dotenv';
import { wordCounterHandler } from './src/handlers/wordCounterHandler';
import { wordStatisticsHandler } from './src/handlers/wordStatisticsHandler';
import errorMiddleware from './src/middleware/error.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json())

app.post('/word-counter', wordCounterHandler);
app.get('/word-statistics', wordStatisticsHandler);

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running! at https://localhost:${port}`);
});