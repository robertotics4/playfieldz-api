import { MockProxy, mock } from 'jest-mock-extended';
import { IPlayerRepository, Player, PlayerPosition } from '@/domain';
import { ListPlayersUseCase } from '@/application';
import { IListPlayersUseCase } from '@/domain/interfaces/useCases/players/IListPlayersUseCase';

describe('ListPlayersUseCase', () => {
  let sut: IListPlayersUseCase;
  let playerRepositoryStub: MockProxy<IPlayerRepository>;
  let players: Player[];

  beforeAll(() => {
    playerRepositoryStub = mock();

    players = [
      {
        id: 'any_id_1',
        name: 'Player 1',
        nickname: 'playerOne',
        age: 33,
        groupsId: [],
        phone: '5598985485698',
        position: PlayerPosition.CB,
        score: 3,
        userId: 'any_user_id_1',
      },
      {
        id: 'any_id_2',
        name: 'playerTwo',
        nickname: 'John',
        age: 30,
        groupsId: [],
        phone: '5598985478569',
        position: PlayerPosition.FB,
        score: 4,
        userId: 'any_user_id_2',
      },
    ];

    playerRepositoryStub.list.mockResolvedValue(players);
  });

  beforeEach(() => {
    sut = new ListPlayersUseCase(playerRepositoryStub);
  });

  it('should call playerRepository.list with correct params', async () => {
    await sut.execute();

    expect(playerRepositoryStub.list).toHaveBeenCalledWith();
    expect(playerRepositoryStub.list).toHaveBeenCalledTimes(1);
  });

  it('should throw if playerRepository.create throws', async () => {
    playerRepositoryStub.list.mockRejectedValueOnce(new Error());

    const promise = sut.execute();

    expect(promise).rejects.toThrow();
  });

  it('should list players', async () => {
    const result = await sut.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(players.length);
  });
});
