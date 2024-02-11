import { Router } from 'express';
import { PlayerRepositoryInMemory } from '@/infra';
import { CreatePlayerUseCase, ListPlayersUseCase } from '@/application';
import { CreatePlayerController } from '../controllers';
import { ListPlayersController } from '../controllers/players/ListPlayersController';

const playersRouter = Router();

const playerRepository = new PlayerRepositoryInMemory();
const createPlayerUseCase = new CreatePlayerUseCase(playerRepository);
const listPlayersUseCase = new ListPlayersUseCase(playerRepository);
const createPlayerController = new CreatePlayerController(createPlayerUseCase);
const listPlayersController = new ListPlayersController(listPlayersUseCase);

playersRouter.post('/', createPlayerController.handle);
playersRouter.get('/', listPlayersController.handle);

export { playersRouter };
