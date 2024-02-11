import { Router } from 'express';
import { CreatePlayerController } from '../controllers';

const playersRouter = Router();

const createPlayerController = new CreatePlayerController();

playersRouter.post('/', createPlayerController.handle);

export { playersRouter };
