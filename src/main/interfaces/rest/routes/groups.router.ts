import { Router } from 'express';
import {
  AddPlayerToGroupController,
  CreateGroupController,
} from '../controllers';

const groupRouter = Router();

const createGroupController = new CreateGroupController();
const addPlayerToGroupController = new AddPlayerToGroupController();

groupRouter.post('/', createGroupController.handle);
groupRouter.post('/:id/add', addPlayerToGroupController.handle);

export { groupRouter };
