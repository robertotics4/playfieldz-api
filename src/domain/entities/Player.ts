export enum PlayerPosition {
  Goleiro = 'GK',
  Defensor = 'DF',
  ZagueiroCentral = 'CB',
  Lateral = 'FB',
  LateralAla = 'WB',
  Libero = 'SW',
  MeioCampista = 'MF',
  MeioCampistaCentral = 'CM',
  MeioCampistaDefensivo = 'DM',
  MeioCampistaOfensivo = 'AM',
  Ala = 'W',
  Atacante = 'FW',
  AtacanteCentroavante = 'ST',
  AtacanteCentro = 'CF',
  SegundoAtacante = 'SS',
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
