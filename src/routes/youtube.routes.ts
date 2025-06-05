import { Router, Request, Response } from 'express';

const youtubeRouter = Router();

youtubeRouter.get('/', (req: Request, res: Response) => {
  res.send('Youtube route!');
});

export default youtubeRouter;
