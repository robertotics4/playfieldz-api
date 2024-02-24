import { Router } from 'express';
import {
  ConfirmPlayerPresenceController,
  CreateMatchController,
  ListMatchesController,
} from '../controllers';

const matchRouter = Router();

const createMatchController = new CreateMatchController();
const confirmPlayerPresenceController = new ConfirmPlayerPresenceController();
const listMatchesController = new ListMatchesController();

matchRouter.post('/', createMatchController.handle);
matchRouter.post('/:id/confirm-player', confirmPlayerPresenceController.handle);
matchRouter.get('/', listMatchesController.handle);

export { matchRouter };
