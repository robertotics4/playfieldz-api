import { Router } from 'express';
import { playersRouter } from './players.router';

const router = Router();

router.use('/players', playersRouter);

export { router };
