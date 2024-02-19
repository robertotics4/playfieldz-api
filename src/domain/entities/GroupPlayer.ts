import { Group } from './Group';
import { Player } from './Player';

export enum PlayerPaymentRecurrence {
  DAILY = 'Diarista',
  MONTHLY = 'Mensalista',
}

abstract class GroupPlayerProps {
  constructor(
    public id: string,
    public groupId: string,
    public playerId: string,
    public paymentRecurrence: PlayerPaymentRecurrence,
  ) {}
}

export class GroupPlayer extends GroupPlayerProps {
  constructor(groupPlayer: GroupPlayerProps) {
    super(
      groupPlayer.id,
      groupPlayer.groupId,
      groupPlayer.playerId,
      groupPlayer.paymentRecurrence,
    );
  }

  group?: Group;

  player?: Player;
}
