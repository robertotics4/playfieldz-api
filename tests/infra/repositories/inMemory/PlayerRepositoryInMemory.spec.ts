import { IPlayerRepository, Player, PlayerPosition } from '@/domain';
import { PlayerRepositoryInMemory } from '@/infra';

describe('PlayerRepositoryInMemory', () => {
  let sut: IPlayerRepository;
  let playerData: Omit<Player, 'id'>;

  beforeAll(() => {
    playerData = {
      name: 'John Doe',
      nickname: 'John',
      age: 33,
      groupsId: [],
      position: PlayerPosition.CB,
      score: 3,
      userId: 'any_user_id',
    };
  });

  beforeEach(() => {
    sut = new PlayerRepositoryInMemory();
  });

  describe('create', () => {
    it('should create a new player', async () => {
      const createdPlayer = await sut.create(playerData);

      expect(createdPlayer).toBeInstanceOf(Player);
      expect(createdPlayer.id).toBeTruthy();
      expect(createdPlayer.name).toEqual(playerData.name);
      expect(createdPlayer.score).toEqual(playerData.score);
    });
  });

  describe('list', () => {
    it('should return an empty array if no players exist', async () => {
      const players = await sut.list();

      expect(players).toEqual([]);
    });

    it('should return an array of players if players exist', async () => {
      await sut.create(playerData);

      const players = await sut.list();

      expect(players.length).toBe(1);
      expect(players[0]).toBeInstanceOf(Player);
      expect(players[0].name).toEqual(playerData.name);
      expect(players[0].score).toEqual(playerData.score);
    });
  });

  describe('update', () => {
    it('should return null if player does not exist', async () => {
      const updatedPlayer = await sut.update('nonexistent-id', playerData);

      expect(updatedPlayer).toBeNull();
    });

    it('should update player data', async () => {
      const createdPlayer = await sut.create(playerData);

      const updatedPlayerData = {
        ...playerData,
        name: 'Updated Name',
        score: 200,
      };

      const updatedPlayer = await sut.update(
        createdPlayer.id,
        updatedPlayerData,
      );

      expect(updatedPlayer).toEqual(expect.objectContaining(updatedPlayerData));
    });
  });

  describe('delete', () => {
    it('should return false if player does not exist', async () => {
      const result = await sut.delete('nonexistent-id');

      expect(result).toBe(false);
    });

    it('should delete player if exists', async () => {
      const createdPlayer = await sut.create(playerData);

      const result = await sut.delete(createdPlayer.id);

      const players = await sut.list();

      expect(result).toBe(true);
      expect(players).toEqual([]);
    });
  });
});
