import { container } from 'tsyringe';
import {
  ICreateUserAndPlayerUseCase,
  IListPlayersUseCase,
  IPlayerRepository,
  IUserRepository,
} from '@/domain';
import { CreateUserAndPlayerUseCase, ListPlayersUseCase } from '@/application';
import { PrismaClient } from '@prisma/client';
import { UserRepositoryInMemory } from '../repositories';
import { PlayerRepository } from '../repositories/database';

container.registerInstance('PrismaClient', new PrismaClient());

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepositoryInMemory,
);

container.registerSingleton<IPlayerRepository>(
  'PlayerRepository',
  PlayerRepository,
);

container.registerSingleton<ICreateUserAndPlayerUseCase>(
  'CreateUserAndPlayerUseCase',
  CreateUserAndPlayerUseCase,
);

container.registerSingleton<IListPlayersUseCase>(
  'ListPlayersUseCase',
  ListPlayersUseCase,
);
