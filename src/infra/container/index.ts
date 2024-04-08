import { container } from 'tsyringe';
import {
  IAddPlayerToGroupUseCase,
  IAuthenticateUserUseCase,
  IConfirmPlayerPresenceUseCase,
  ICreateGroupUseCase,
  ICreateMatchUseCase,
  ICreateUserAndPlayerUseCase,
  IEncryptor,
  IGroupRepository,
  IJsonWebToken,
  IListMatchesUseCase,
  IListPlayersUseCase,
  IListUsersUseCase,
  IMatchRepository,
  IPlayerRepository,
  IRecoverUserInformationUseCase,
  IUpdateUserPermissionsUseCase,
  IUserRepository,
  IVerifyUserPermissionUseCase,
} from '@/domain';
import {
  AddPlayerToGroupUseCase,
  AuthenticateUserUseCase,
  ConfirmPlayerPresenceUseCase,
  CreateGroupUseCase,
  CreateMatchUseCase,
  CreateUserAndPlayerUseCase,
  ListMatchesUseCase,
  ListPlayersUseCase,
  ListUsersUseCase,
  RecoverUserInformationUseCase,
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

container.registerSingleton<IConfirmPlayerPresenceUseCase>(
  'ConfirmPlayerPresenceUseCase',
  ConfirmPlayerPresenceUseCase,
);

container.registerSingleton<IUpdateUserPermissionsUseCase>(
  'UpdateUserPermissionsUseCase',
  UpdateUserPermissionsUseCase,
);

container.registerSingleton<IListMatchesUseCase>(
  'ListMatchesUseCase',
  ListMatchesUseCase,
);

container.registerSingleton<IListUsersUseCase>(
  'ListUsersUseCase',
  ListUsersUseCase,
);

container.registerSingleton<IRecoverUserInformationUseCase>(
  'RecoverUserInformationUseCase',
  RecoverUserInformationUseCase,
);
