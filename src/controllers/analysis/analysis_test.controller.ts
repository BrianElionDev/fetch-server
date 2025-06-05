import { NextFunction, Request, Response } from 'express';

export const analysisTestController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  res.send('Analysis controller!');
};
