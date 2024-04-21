import { Router } from 'express';
import {
  CreateMatchController,
  FindMatchesController,
  UpdatePlayerPresenceController,
} from '../controllers';

const matchRouter = Router();

const createMatchController = new CreateMatchController();
const updatePlayerPresenceController = new UpdatePlayerPresenceController();
const findMatchesController = new FindMatchesController();

matchRouter.post('/', createMatchController.handle);
matchRouter.patch('/:id/presence', updatePlayerPresenceController.handle);
matchRouter.get('/', findMatchesController.handle);

export { matchRouter };
