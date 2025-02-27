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

export class Player {
  _id: string;

  nickname: string;

  age: number;

  position: PlayerPosition;

  userId: string;

  attributes: PlayerAttribute[];

  score?: number;

  constructor(player: Player) {
    this._id = player._id;
    this.nickname = player.nickname;
    this.age = player.age;
    this.position = player.position;
    this.userId = player.userId;
    this.attributes = player.attributes;
    this.score = player.score;
  }
}
