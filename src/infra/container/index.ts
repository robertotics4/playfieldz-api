import { container } from 'tsyringe';
import {
  ICreateUserAndPlayerUseCase,
  IGroupRepository,
  IListPlayersUseCase,
  IPlayerRepository,
  IUserRepository,
} from '@/domain';
import {
  CreateGroupUseCase,
  CreateUserAndPlayerUseCase,
  ListPlayersUseCase,
} from '@/application';
import { PrismaClient } from '@prisma/client';
import { GroupRepository, PlayerRepository, UserRepository } from '@/infra';
import { ICreateGroupUseCase } from '@/domain/interfaces/useCases/groups/ICreateGroupUseCase';

container.registerInstance('PrismaClient', new PrismaClient());

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IPlayerRepository>(
  'PlayerRepository',
  PlayerRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IGroupRepository>(
  'GroupRepository',
  GroupRepository,
);

container.registerSingleton<ICreateUserAndPlayerUseCase>(
  'CreateUserAndPlayerUseCase',
  CreateUserAndPlayerUseCase,
);

container.registerSingleton<IListPlayersUseCase>(
  'ListPlayersUseCase',
  ListPlayersUseCase,
);

container.registerSingleton<ICreateGroupUseCase>(
  'CreateGroupUseCase',
  CreateGroupUseCase,
);
