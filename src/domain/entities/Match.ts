import { Group } from './Group';
import { GroupPlayer } from './GroupPlayer';

export type Location = {
  latitude: string;
  longitude: string;
};

abstract class MatchProps {
  constructor(
    public id: string,
    public location: Location,
    public schedulling: Date,
    public maxPlayerLimit: number,
    public playersPerTeam: number,
    public groupId: string,
  ) {}
}

export class Match extends MatchProps {
  constructor(match: MatchProps) {
    super(
      match.id,
      match.location,
      match.schedulling,
      match.maxPlayerLimit,
      match.playersPerTeam,
      match.groupId,
    );
  }

  group?: Group;

  players?: GroupPlayer[];
}
