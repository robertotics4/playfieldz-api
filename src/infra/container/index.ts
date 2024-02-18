import { container } from 'tsyringe';
import {
  Group,
  GroupPlayer,
  ICreateUserAndPlayerUseCase,
  IGroupPlayerRepository,
  IGroupRepository,
  IListPlayersUseCase,
  IMapper,
  IPlayerRepository,
  IUserRepository,
  Player,
  User,
} from '@/domain';
import {
  CreateGroupUseCase,
  CreateUserAndPlayerUseCase,
  ListPlayersUseCase,
} from '@/application';
import {
  Group as GroupModel,
  Player as PlayerModel,
  User as UserModel,
  GroupPlayer as GroupPlayerModel,
  PrismaClient,
} from '@prisma/client';
import {
  GroupMapper,
  GroupPlayerMapper,
  GroupPlayerRepository,
  GroupRepository,
  PlayerMapper,
  PlayerRepository,
  UserMapper,
  UserRepository,
} from '@/infra';
import { ICreateGroupUseCase } from '@/domain/interfaces/useCases/groups/ICreateGroupUseCase';

// Database Client
container.registerInstance('PrismaClient', new PrismaClient());

// Repositories
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

container.registerSingleton<IGroupPlayerRepository>(
  'GroupPlayerRepository',
  GroupPlayerRepository,
);

// Mappers
container.registerSingleton<IMapper<GroupModel, Group>>(
  'GroupMapper',
  GroupMapper,
);

container.registerSingleton<IMapper<PlayerModel, Player>>(
  'PlayerMapper',
  PlayerMapper,
);

container.registerSingleton<IMapper<UserModel, User>>('UserMapper', UserMapper);

container.registerSingleton<IMapper<GroupPlayerModel, GroupPlayer>>(
  'GroupPlayerMapper',
  GroupPlayerMapper,
);

// Use cases

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
