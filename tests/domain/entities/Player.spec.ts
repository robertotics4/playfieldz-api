import { AttributeName, Player, PlayerPosition } from '@/domain';

describe('Player', () => {
  const playerData: Player = {
    id: '1',
    name: 'John Doe',
    nickname: 'JD',
    age: 25,
    position: PlayerPosition.FW,
    userId: 'any_user_id',
    attributes: [
      {
        name: AttributeName.DEFENSE,
        value: 5,
      },
      {
        name: AttributeName.ASSISTING,
        value: 5,
      },
      {
        name: AttributeName.DRIBBLING,
        value: 5,
      },
      {
        name: AttributeName.SHOOTING,
        value: 5,
      },
      {
        name: AttributeName.SKILLS,
        value: 5,
      },
    ],
  };

  it('should create a player instance', () => {
    const player = new Player(playerData);
    expect(player).toBeDefined();
    expect(player instanceof Player).toBeTruthy();
  });

  it('should properly initialize player properties', () => {
    const player = new Player(playerData);
    expect(player.id).toEqual(playerData.id);
    expect(player.name).toEqual(playerData.name);
    expect(player.nickname).toEqual(playerData.nickname);
    expect(player.age).toEqual(playerData.age);
    expect(player.position).toEqual(playerData.position);
  });
});
