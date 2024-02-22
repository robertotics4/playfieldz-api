import { container } from 'tsyringe';
import {
  Group,
  GroupPlayer,
  IAddPlayerToGroupUseCase,
  IAuthenticateUserUseCase,
  IConfirmPlayerPresenceUseCase,
  ICreateGroupUseCase,
  ICreateMatchUseCase,
  ICreateUserAndPlayerUseCase,
  IEncryptor,
  IGroupPlayerRepository,
  IGroupRepository,
  IJsonWebToken,
  IListPlayersUseCase,
  IMapper,
  IMatchPlayerRepository,
  IMatchRepository,
  IPlayerRepository,
  IUserRepository,
  IVerifyUserPermissionUseCase,
  Match,
  MatchPlayer,
  Player,
  User,
} from '@/domain';
import {
  AddPlayerToGroupUseCase,
  AuthenticateUserUseCase,
  ConfirmPlayerPresenceUseCase,
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
  MatchPlayer as MatchPlayerModel,
  PrismaClient,
} from '@prisma/client';
import {
  BCryptEncryptor,
  GroupMapper,
  GroupPlayerMapper,
  GroupPlayerRepository,
  GroupRepository,
  JsonWebToken,
  MatchMapper,
  MatchPlayerMapper,
  MatchPlayerRepository,
  MatchRepository,
  PlayerMapper,
  PlayerRepository,
  UserMapper,
  UserRepository,
} from '@/infra';

// Database Client
container.registerInstance('PrismaClient', new PrismaClient());

// Infrastructure
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

container.registerSingleton<IMatchPlayerRepository>(
  'MatchPlayerRepository',
  MatchPlayerRepository,
);

container.registerSingleton<IEncryptor>('Encryptor', BCryptEncryptor);

container.registerSingleton<IJsonWebToken>('JsonWebToken', JsonWebToken);

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

container.registerSingleton<IMapper<MatchPlayerModel, MatchPlayer>>(
  'MatchPlayerMapper',
  MatchPlayerMapper,
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

container.registerSingleton<IAuthenticateUserUseCase>(
  'AuthenticateUserUseCase',
  AuthenticateUserUseCase,
);

container.registerSingleton<IConfirmPlayerPresenceUseCase>(
  'ConfirmPlayerPresenceUseCase',
  ConfirmPlayerPresenceUseCase,
);
