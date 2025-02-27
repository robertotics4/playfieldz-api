import { Player } from './Player';

export enum UserPermission {
  PLAYER = 'Player',
  ADMIN = 'Administrator',
  ROOT = 'Root',
}

export type UserRole = {
  groupId: string;
  permission: UserPermission;
};

export class User {
  _id: string;

  name: string;

  phone: string;

  password: string;

  roles: UserRole[];

  player?: Player | undefined;

  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.phone = user.phone;
    this.password = user.password;
    this.roles = user.roles;
    this.player = user.player;
  }
}
