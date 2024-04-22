import { container } from 'tsyringe';
import {
  IAddPlayerToGroupUseCase,
  IAuthenticateUserUseCase,
  ICreateGroupUseCase,
  ICreateMatchUseCase,
  ICreateUserAndPlayerUseCase,
  IEncryptor,
  IFindGroupsUseCase,
  IFindMatchesUseCase,
  IGroupRepository,
  IJsonWebToken,
  IListPlayersUseCase,
  IListUsersUseCase,
  ILoadUsersFromCsvUseCase,
  IMatchRepository,
  IPlayerRepository,
  IRecoverUserInformationUseCase,
  IUpdatePlayerPresenceUseCase,
  IUpdateUserPermissionsUseCase,
  IUserRepository,
  IVerifyUserPermissionUseCase,
} from '@/domain';
import {
  AddPlayerToGroupUseCase,
  AuthenticateUserUseCase,
  CreateGroupUseCase,
  CreateMatchUseCase,
  CreateUserAndPlayerUseCase,
  FindGroupsUseCase,
  FindMatchesUseCase,
  ListPlayersUseCase,
  ListUsersUseCase,
  LoadUsersFromCsvUseCase,
  RecoverUserInformationUseCase,
  UpdatePlayerPresenceUseCase,
  UpdateUserPermissionsUseCase,
  VerifyUserPermissionUseCase,
} from '@/application';
import {
  BCryptEncryptor,
  GroupRepository,
  JsonWebToken,
  MatchRepository,
  PlayerRepository,
  UserRepository,
} from '@/infra';

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

container.registerSingleton<IMatchRepository>(
  'MatchRepository',
  MatchRepository,
);

container.registerSingleton<IEncryptor>('Encryptor', BCryptEncryptor);

container.registerSingleton<IJsonWebToken>('JsonWebToken', JsonWebToken);

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

container.registerSingleton<IUpdatePlayerPresenceUseCase>(
  'UpdatePlayerPresenceUseCase',
  UpdatePlayerPresenceUseCase,
);

container.registerSingleton<IUpdateUserPermissionsUseCase>(
  'UpdateUserPermissionsUseCase',
  UpdateUserPermissionsUseCase,
);

container.registerSingleton<IListUsersUseCase>(
  'ListUsersUseCase',
  ListUsersUseCase,
);

container.registerSingleton<IRecoverUserInformationUseCase>(
  'RecoverUserInformationUseCase',
  RecoverUserInformationUseCase,
);

container.registerSingleton<IFindGroupsUseCase>(
  'FindGroupsUseCase',
  FindGroupsUseCase,
);

container.registerSingleton<IFindMatchesUseCase>(
  'FindMatchesUseCase',
  FindMatchesUseCase,
);

container.registerSingleton<ILoadUsersFromCsvUseCase>(
  'LoadUsersFromCsvUseCase',
  LoadUsersFromCsvUseCase,
);
