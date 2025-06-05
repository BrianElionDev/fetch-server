import express, { Request, Response } from 'express';
import analysisRouter from './routes/analysis.routes';
import youtubeRouter from './routes/youtube.routes';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/', (req: Request, res: Response) => {
  res.send('Fetch server running!');
});
app.use('/api/v1/analysis', analysisRouter);
app.use('/api/v1/youtube', youtubeRouter);

export default app;
