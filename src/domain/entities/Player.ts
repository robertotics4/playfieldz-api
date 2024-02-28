import { User } from './User';

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

abstract class PlayerProps {
  constructor(
    public id: string,
    public name: string,
    public nickname: string,
    public age: number,
    public position: PlayerPosition,
    public userId: string,
    public attributes: PlayerAttribute[],
    public score?: number,
  ) {}
}

export class Player extends PlayerProps {
  constructor(player: PlayerProps) {
    super(
      player.id,
      player.name,
      player.nickname,
      player.age,
      player.position,
      player.userId,
      player.attributes,
    );
  }

  user?: Omit<User, 'password'>;
}
