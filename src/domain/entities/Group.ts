import { PlayerDocument } from './Player';
import { User } from './User';

export enum PlayerPaymentRecurrence {
  DAILY = 'Diarista',
  MONTHLY = 'Mensalista',
}

export type GroupPlayer = {
  player: PlayerDocument;
  paymentRecurrence: PlayerPaymentRecurrence;
};

export class Group {
  _id: string;

  name: string;

  createdBy: User;

  groupPlayers: GroupPlayer[];

  description?: string;

  imageUrl?: string;

  constructor(group: Group) {
    this._id = group._id;
    this.name = group.name;
    this.createdBy = group.createdBy;
    this.groupPlayers = group.groupPlayers;
    this.description = group.description;
    this.imageUrl = group.imageUrl;
  }
}
