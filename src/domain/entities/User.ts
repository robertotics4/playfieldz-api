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
    public phone: string,
    public password: string,
    public roles: UserRole[],
  ) {}
}

export class User extends UserProps {
  constructor(user: UserProps) {
    super(user.id, user.phone, user.password, user.roles);
  }
}
