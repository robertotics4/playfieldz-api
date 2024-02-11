export enum PlayerPosition {
  GK = 'Goleiro',
  CB = 'Zagueiro',
  FB = 'Lateral',
  DM = 'Volante',
  MF = 'MeioCampo',
  FW = 'Atacante',
}

abstract class PlayerProps {
  constructor(
    public id: string,
    public name: string,
    public nickname: string,
    public age: number,
    public position: PlayerPosition,
    public score: number,
    public phone: string,
    public groupsId: string[],
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
      player.score,
      player.phone,
      player.groupsId,
    );
  }
}
