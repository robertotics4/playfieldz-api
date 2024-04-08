import { Router } from 'express';
import {
  ListUsersController,
  RecoverUserInformationController,
} from '../controllers';

const userRouter = Router();

const listUsersController = new ListUsersController();
const recoverUserInformationController = new RecoverUserInformationController();

userRouter.get('/', listUsersController.handle);
userRouter.get('/info', recoverUserInformationController.handle);

export { userRouter };
