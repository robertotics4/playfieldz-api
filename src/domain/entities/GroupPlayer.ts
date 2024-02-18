import { Group } from './Group';
import { Player } from './Player';

abstract class GroupPlayerProps {
  constructor(
    public id: string,
    public groupId: string,
    public playerId: string,
  ) {}
}

export class GroupPlayer extends GroupPlayerProps {
  constructor(groupPlayer: GroupPlayerProps) {
    super(groupPlayer.id, groupPlayer.groupId, groupPlayer.playerId);
  }

  group?: Group;

  player?: Player;
}
