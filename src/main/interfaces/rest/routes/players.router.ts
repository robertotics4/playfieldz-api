import { Router } from 'express';
import { ListPlayersController } from '../controllers/players/ListPlayersController';

const playersRouter = Router();

const listPlayersController = new ListPlayersController();

playersRouter.get('/', listPlayersController.handle);

export { playersRouter };
