import { Router } from 'express';
import { CreateMatchController } from '../controllers';

const matchRouter = Router();

const createMatchController = new CreateMatchController();

matchRouter.post('/', createMatchController.handle);

export { matchRouter };
