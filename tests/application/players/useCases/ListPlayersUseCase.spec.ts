import { MockProxy, mock } from 'jest-mock-extended';
import {
  AttributeName,
  IPlayerRepository,
  Player,
  PlayerPosition,
} from '@/domain';
import { ListPlayersUseCase } from '@/application';
import { IListPlayersUseCase } from '@/domain/interfaces/useCases/players/IListPlayersUseCase';

describe('ListPlayersUseCase', () => {
  let sut: IListPlayersUseCase;
  let playerRepositoryStub: MockProxy<IPlayerRepository>;
  let players: Player[];

  beforeAll(() => {
    playerRepositoryStub = mock();

    const defaultPlayerAttributes = [
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
    ];

    players = [
      {
        id: 'any_id_1',
        name: 'Player 1',
        nickname: 'playerOne',
        age: 33,
        position: PlayerPosition.CB,
        userId: 'any_user_id_1',
        attributes: defaultPlayerAttributes,
      },
      {
        id: 'any_id_2',
        name: 'playerTwo',
        nickname: 'John',
        age: 30,
        position: PlayerPosition.FB,
        userId: 'any_user_id_2',
        attributes: defaultPlayerAttributes,
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
