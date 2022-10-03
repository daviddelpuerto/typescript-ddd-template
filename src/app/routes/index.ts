import { Router } from 'express';
import apiRouter from './api.router';

const router = Router();

router.use('/api', apiRouter);

export default router;