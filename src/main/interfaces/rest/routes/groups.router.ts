import { Router } from 'express';
import { CreateGroupController } from '../controllers';

const groupRouter = Router();

const createGroupController = new CreateGroupController();

groupRouter.post('/', createGroupController.handle);

export { groupRouter };
