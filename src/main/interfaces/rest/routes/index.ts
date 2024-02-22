import { Router } from 'express';
import { playersRouter } from './players.router';
import { registerRouter } from './register.router';
import { groupRouter } from './groups.router';
import { matchRouter } from './matches.routes';
import { authRouter } from './auth.routes';
import { ensureAuthenticated } from '../middlewares';

const router = Router();

// public routes
router.use('/auth', authRouter);
router.use('/register', registerRouter);

router.use(ensureAuthenticated);

// private routes
router.use('/players', playersRouter);
router.use('/groups', groupRouter);
router.use('/matches', matchRouter);

export { router };
