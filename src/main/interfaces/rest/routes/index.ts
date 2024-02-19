import { Router } from 'express';
import { playersRouter } from './players.router';
import { registerRouter } from './register.router';
import { groupRouter } from './groups.router';
import { matchRouter } from './matches.routes';

const router = Router();

router.use('/players', playersRouter);
router.use('/groups', groupRouter);
router.use('/register', registerRouter);
router.use('/matches', matchRouter);

export { router };
