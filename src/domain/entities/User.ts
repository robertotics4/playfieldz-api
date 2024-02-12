export enum UserPermission {
  PLAYER = 'Player',
  ADMIN = 'Administrator',
  ROOT = 'Root',
}

export type UserRole = {
  groupId: string;
  permission: UserPermission;
};

abstract class UserProps {
  constructor(
    public id: string,
    public login: string,
    public password: string,
    public roles: UserRole[],
  ) {}
}

export class User extends UserProps {
  constructor(user: UserProps) {
    super(user.id, user.login, user.password, user.roles);
  }
}
