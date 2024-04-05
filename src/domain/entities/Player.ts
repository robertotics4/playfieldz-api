import { BaseDocument } from '@/infra';
import { Document, Types } from 'mongoose';

export enum PlayerPosition {
  GK = 'Goleiro',
  CB = 'Zagueiro',
  FB = 'Lateral',
  DM = 'Volante',
  MF = 'MeioCampo',
  FW = 'Atacante',
}

export enum AttributeName {
  DEFENSE = 'Defesa',
  ASSISTING = 'Assistência',
  SHOOTING = 'Chute',
  DRIBBLING = 'Drible',
  SKILLS = 'Habilidades',
}

export type PlayerAttribute = {
  name: AttributeName;
  value: number;
};

export interface PlayerDocument extends BaseDocument {
  name: string;
  nickname: string;
  age: number;
  position: PlayerPosition;
  userId: string;
  attributes: PlayerAttribute[];
  score?: number;
}

export class Player extends Document implements PlayerDocument {
  override _id: Types.ObjectId;

  name: string;

  nickname: string;

  age: number;

  position: PlayerPosition;

  userId: string;

  attributes: PlayerAttribute[];

  score?: number;

  constructor(player: PlayerDocument) {
    super();
    this._id = player._id;
    this.name = player.name;
    this.nickname = player.nickname;
    this.age = player.age;
    this.position = player.position;
    this.userId = player.userId;
    this.attributes = player.attributes;
    this.score = player.score;
  }
}
