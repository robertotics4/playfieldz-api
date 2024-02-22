import { Match } from './Match';
import { Player } from './Player';

abstract class MatchPlayerProps {
  constructor(
    public id: string,
    public playerId: string,
    public matchId: string,
  ) {}
}

export class MatchPlayer extends MatchPlayerProps {
  constructor(matchPlayer: MatchPlayerProps) {
    super(matchPlayer.id, matchPlayer.playerId, matchPlayer.matchId);
  }

  match?: Match;

  player?: Player;
}
