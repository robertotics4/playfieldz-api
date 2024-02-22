import { Router } from 'express';
import {
  ConfirmPlayerPresenceController,
  CreateMatchController,
} from '../controllers';

const matchRouter = Router();

const createMatchController = new CreateMatchController();
const confirmPlayerPresenceController = new ConfirmPlayerPresenceController();

matchRouter.post('/', createMatchController.handle);
matchRouter.post('/:id/confirm-player', confirmPlayerPresenceController.handle);

export { matchRouter };
