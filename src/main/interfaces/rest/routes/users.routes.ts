import { Router } from 'express';
import { ListUsersController } from '../controllers';

const userRouter = Router();

const listUsersController = new ListUsersController();

userRouter.get('/', listUsersController.handle);

export { userRouter };
