import { Types } from 'mongoose';
import { Player } from './Player';
import { User } from './User';

export enum PlayerPaymentRecurrence {
  DAILY = 'Diarista',
  MONTHLY = 'Mensalista',
}

export type PlayerSubscription = {
  player: Player;
  paymentRecurrence: PlayerPaymentRecurrence;
};

export class Group {
  _id: Types.ObjectId;

  name: string;

  createdBy: User;

  playerSubscriptions: PlayerSubscription[];

  description?: string;

  imageUrl?: string;

  constructor(group: Group) {
    this._id = group._id;
    this.name = group.name;
    this.createdBy = group.createdBy;
    this.playerSubscriptions = group.playerSubscriptions;
    this.description = group.description;
    this.imageUrl = group.imageUrl;
  }
}
