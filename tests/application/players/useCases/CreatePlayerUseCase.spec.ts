import { MockProxy, mock } from 'jest-mock-extended';
import {
  ICreatePlayerUseCase,
  IPlayerRepository,
  PlayerPosition,
} from '@/domain';
import { CreatePlayerUseCase } from '@/application';
import { CreatePlayerDTO } from '@/domain/dtos/players';

describe('CreatePlayerUseCase', () => {
  let sut: ICreatePlayerUseCase;
  let playerRepositoryStub: MockProxy<IPlayerRepository>;
  let dto: CreatePlayerDTO;

  beforeAll(() => {
    playerRepositoryStub = mock();

    dto = {
      name: 'John Doe',
      nickname: 'John',
      age: 33,
      groupsId: [],
      phone: '5598985485698',
      position: PlayerPosition.CB,
      score: 5,
    };

    playerRepositoryStub.create.mockResolvedValueOnce({ ...dto, id: 'any_id' });
  });

  beforeEach(() => {
    sut = new CreatePlayerUseCase(playerRepositoryStub);
  });

  it('should create an player', async () => {
    const result = await sut.execute(dto);

    expect(result).toHaveProperty('id');
    expect(result).toBeTruthy();
  });

  // it('should throw if score is invalid', async () => {
  //   const playerWithInvalidScore = { ...dto, score: 0 };

  //   const promise = sut.execute(playerWithInvalidScore);

  //   expect(promise).toThrow();
  // });
});
