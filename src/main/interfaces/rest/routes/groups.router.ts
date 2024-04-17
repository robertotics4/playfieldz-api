import { Router } from 'express';
import {
  AddPlayerToGroupController,
  CreateGroupController,
  FindGroupsController,
} from '../controllers';

const groupRouter = Router();

const createGroupController = new CreateGroupController();
const addPlayerToGroupController = new AddPlayerToGroupController();
const findGroupsController = new FindGroupsController();

groupRouter.get('/', findGroupsController.handle);
groupRouter.post('/', createGroupController.handle);
groupRouter.post('/:id/add', addPlayerToGroupController.handle);

export { groupRouter };
