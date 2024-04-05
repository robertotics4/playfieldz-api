import { Types } from 'mongoose';
import { Group } from './Group';
import { Player } from './Player';

export type Location = {
  latitude: string;
  longitude: string;
};

export class Match {
  _id: Types.ObjectId;

  schedulling: Date;

  maxPlayerLimit: number;

  playersPerTeam: number;

  group: Group;

  matchPlayers: Player[];

  location?: Location;

  constructor(match: Match) {
    this._id = match._id;
    this.schedulling = match.schedulling;
    this.maxPlayerLimit = match.maxPlayerLimit;
    this.playersPerTeam = match.playersPerTeam;
    this.group = match.group;
    this.matchPlayers = match.matchPlayers;
    this.location = match.location;
  }
}
