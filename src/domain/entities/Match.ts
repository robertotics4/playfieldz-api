import { BaseDocument } from '@/infra';
import { Document, Types } from 'mongoose';
import { GroupDocument } from './Group';
import { PlayerDocument } from './Player';

export type Location = {
  latitude: string;
  longitude: string;
};

export interface MatchDocument extends BaseDocument {
  schedulling: Date;
  maxPlayerLimit: number;
  playersPerTeam: number;
  group: GroupDocument;
  matchPlayers: PlayerDocument[];
  location?: Location;
}

export class Match extends Document implements MatchDocument {
  override _id: Types.ObjectId;

  schedulling: Date;

  maxPlayerLimit: number;

  playersPerTeam: number;

  group: GroupDocument;

  matchPlayers: PlayerDocument[];

  location?: Location;

  constructor(match: MatchDocument) {
    super();
    this._id = match._id;
    this.schedulling = match.schedulling;
    this.maxPlayerLimit = match.maxPlayerLimit;
    this.playersPerTeam = match.playersPerTeam;
    this.group = match.group;
    this.matchPlayers = match.matchPlayers;
    this.location = match.location;
  }
}
