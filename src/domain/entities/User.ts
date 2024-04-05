import { Types } from 'mongoose';
import { Player } from './Player';

export enum UserPermission {
  PLAYER = 'Player',
  ADMIN = 'Administrator',
  ROOT = 'Root',
}

export type UserRole = {
  groupId: Types.ObjectId;
  permission: UserPermission;
};

export class User {
  _id: Types.ObjectId;

  phone: string;

  password: string;

  roles: UserRole[];

  player?: Player | undefined;

  constructor(user: User) {
    this._id = user._id;
    this.phone = user.phone;
    this.password = user.password;
    this.roles = user.roles;
    this.player = user.player;
  }
}
