import { container } from 'tsyringe';
import {
  Group,
  GroupPlayer,
  IAddPlayerToGroupUseCase,
  ICreateGroupUseCase,
  ICreateMatchUseCase,
  ICreateUserAndPlayerUseCase,
  IGroupPlayerRepository,
  IGroupRepository,
  IListPlayersUseCase,
  IMapper,
  IMatchRepository,
  IPlayerRepository,
  IUserRepository,
  IVerifyUserPermissionUseCase,
  Match,
  Player,
  User,
} from '@/domain';
import {
  AddPlayerToGroupUseCase,
  CreateGroupUseCase,
  CreateMatchUseCase,
  CreateUserAndPlayerUseCase,
  ListPlayersUseCase,
  VerifyUserPermissionUseCase,
} from '@/application';
import {
  Group as GroupModel,
  Player as PlayerModel,
  User as UserModel,
  GroupPlayer as GroupPlayerModel,
  Match as MatchModel,
  PrismaClient,
} from '@prisma/client';
import {
  GroupMapper,
  GroupPlayerMapper,
  GroupPlayerRepository,
  GroupRepository,
  MatchMapper,
  MatchRepository,
  PlayerMapper,
  PlayerRepository,
  UserMapper,
  UserRepository,
} from '@/infra';

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

container.registerSingleton<IMatchRepository>(
  'MatchRepository',
  MatchRepository,
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

container.registerSingleton<IMapper<MatchModel, Match>>(
  'MatchMapper',
  MatchMapper,
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

container.registerSingleton<IAddPlayerToGroupUseCase>(
  'AddPlayerToGroupUseCase',
  AddPlayerToGroupUseCase,
);

container.registerSingleton<ICreateMatchUseCase>(
  'CreateMatchUseCase',
  CreateMatchUseCase,
);

container.registerSingleton<IVerifyUserPermissionUseCase>(
  'VerifyUserPermissionUseCase',
  VerifyUserPermissionUseCase,
);
