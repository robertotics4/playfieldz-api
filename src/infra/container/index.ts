import { container } from 'tsyringe';
import {
  Group,
  ICreateUserAndPlayerUseCase,
  IGroupRepository,
  IListPlayersUseCase,
  IMapper,
  IPlayerRepository,
  IUserRepository,
} from '@/domain';
import {
  CreateGroupUseCase,
  CreateUserAndPlayerUseCase,
  ListPlayersUseCase,
} from '@/application';
import { Group as GroupModel, PrismaClient } from '@prisma/client';
import {
  GroupMapper,
  GroupRepository,
  PlayerRepository,
  UserRepository,
} from '@/infra';
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

container.registerSingleton<IMapper<GroupModel, Group>>(
  'GroupMapper',
  GroupMapper,
);
