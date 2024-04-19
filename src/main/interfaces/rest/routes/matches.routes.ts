import { Router } from 'express';
import {
  ConfirmPlayerPresenceController,
  CreateMatchController,
  FindMatchesController,
} from '../controllers';

const matchRouter = Router();

const createMatchController = new CreateMatchController();
const confirmPlayerPresenceController = new ConfirmPlayerPresenceController();
const findMatchesController = new FindMatchesController();

matchRouter.post('/', createMatchController.handle);
matchRouter.post('/:id/confirm-player', confirmPlayerPresenceController.handle);
matchRouter.get('/', findMatchesController.handle);

export { matchRouter };
