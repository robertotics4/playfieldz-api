import { Router } from 'express';
import { CreateUserAndPlayerController } from '../controllers';

const registerRouter = Router();

const createUserAndPlayerController = new CreateUserAndPlayerController();

registerRouter.post('/', createUserAndPlayerController.handle);

export { registerRouter };
