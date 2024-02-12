import { container } from 'tsyringe';
import {
  ICreateUserAndPlayerUseCase,
  IListPlayersUseCase,
  IPlayerRepository,
  IUserRepository,
} from '@/domain';
import { CreateUserAndPlayerUseCase, ListPlayersUseCase } from '@/application';
import {
  PlayerRepositoryInMemory,
  UserRepositoryInMemory,
} from '../repositories';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepositoryInMemory,
);

container.registerSingleton<IPlayerRepository>(
  'PlayerRepository',
  PlayerRepositoryInMemory,
);

container.registerSingleton<ICreateUserAndPlayerUseCase>(
  'CreateUserAndPlayerUseCase',
  CreateUserAndPlayerUseCase,
);

container.registerSingleton<IListPlayersUseCase>(
  'ListPlayersUseCase',
  ListPlayersUseCase,
);
