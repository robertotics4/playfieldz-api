import { Player } from './Player';
import { Group } from './Group';

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

  phone?: string;

  password?: string;

  roles: UserRole[];

  player?: Player | undefined;

  groups: Group[];

  constructor(user: User) {
    this._id = user._id;
    this.phone = user.phone;
    this.password = user.password;
    this.roles = user.roles;
    this.player = user.player;
    this.groups = user.groups;
  }
}
