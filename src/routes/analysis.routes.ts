import { Router, Request, Response } from 'express';
import { analysisController } from '../controllers/analysis/analysis.controller';
import { analysisTestController } from '../controllers/analysis/analysis_test.controller';
import { validateTestController } from '../controllers/analysis/validate_test.controller';
import { validateController } from '../controllers/analysis/validate.controller';

const analysisRouter = Router();

analysisRouter.post('/single', analysisController);
analysisRouter.post('/validate', validateController);
analysisRouter.post('/single/test', analysisTestController);
analysisRouter.post('/validate/test', validateTestController);

export default analysisRouter;
