import { MockProxy, mock } from 'jest-mock-extended';
import {
  AppError,
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
      score: 3,
      userId: 'any_user_id',
    };

    playerRepositoryStub.create.mockResolvedValue({ ...dto, id: 'any_id' });
  });

  beforeEach(() => {
    sut = new CreatePlayerUseCase(playerRepositoryStub);
  });

  it('should call playerRepository.create with correct params', async () => {
    await sut.execute(dto);

    expect(playerRepositoryStub.create).toHaveBeenCalledWith(dto);
    expect(playerRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if playerRepository.create throws', async () => {
    playerRepositoryStub.create.mockRejectedValueOnce(new Error());

    const promise = sut.execute(dto);

    expect(promise).rejects.toThrow();
  });

  it('should create an player', async () => {
    const result = await sut.execute(dto);

    expect(result).toHaveProperty('id');
    expect(result).toBeTruthy();
  });

  it('should throw if score is invalid', async () => {
    const playerWithInvalidScore = { ...dto, score: 0 };

    const promise = sut.execute(playerWithInvalidScore);

    expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
