import { Router } from 'express';
import { playersRouter } from './players.router';
import { registerRouter } from './register.router';
import { groupRouter } from './groups.router';
import { matchRouter } from './matches.routes';
import { authRouter } from './auth.routes';
import { ensureAuthenticated } from '../middlewares';

const router = Router();

// public routes
router.get('/', (request, response) => {
  return response.json({
    appName: 'Playfieldz API',
    version: '1.0.0',
  });
});

router.use('/auth', authRouter);
router.use('/register', registerRouter);

// private routes
router.use('/players', ensureAuthenticated, playersRouter);
router.use('/groups', ensureAuthenticated, groupRouter);
router.use('/matches', ensureAuthenticated, matchRouter);

export { router };
