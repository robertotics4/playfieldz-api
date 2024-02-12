import { Router } from 'express';
import { playersRouter } from './players.router';
import { registerRouter } from './register.router';

const router = Router();

router.use('/players', playersRouter);
router.use('/register', registerRouter);

export { router };
