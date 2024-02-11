import { Player, PlayerPosition } from '@/domain';

describe('Player', () => {
  const playerData: Player = {
    id: '1',
    name: 'John Doe',
    nickname: 'JD',
    age: 25,
    position: PlayerPosition.FW,
    score: 90,
    phone: '123456789',
    groupsId: ['group1', 'group2'],
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
    expect(player.score).toEqual(playerData.score);
    expect(player.phone).toEqual(playerData.phone);
    expect(player.groupsId).toEqual(playerData.groupsId);
  });
});
