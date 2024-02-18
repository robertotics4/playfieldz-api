import { MockProxy, mock } from 'jest-mock-extended';
import {
  AppError,
  CreateUserAndPlayerDTO,
  ICreateUserAndPlayerUseCase,
  IPlayerRepository,
  IUserRepository,
  PlayerPosition,
  User,
} from '@/domain';
import { CreateUserAndPlayerUseCase } from '@/application';

describe('CreateUserAndPlayerUseCase', () => {
  let sut: ICreateUserAndPlayerUseCase;
  let userRepositoryStub: MockProxy<IUserRepository>;
  let playerRepositoryStub: MockProxy<IPlayerRepository>;
  let dto: CreateUserAndPlayerDTO;

  beforeAll(() => {
    userRepositoryStub = mock();
    playerRepositoryStub = mock();

    dto = {
      user: {
        phone: '5598985485698',
        password: 'any_password',
        roles: [],
      },
      player: {
        name: 'John Doe',
        nickname: 'John',
        age: 33,
        position: PlayerPosition.CB,
        score: 3,
        userId: 'any_user_id',
      },
    };

    const { password, ...userWithoutPassword } = dto.user;

    userRepositoryStub.create.mockResolvedValue({
      ...userWithoutPassword,
      id: 'any_user_id',
    } as User);
    playerRepositoryStub.create.mockResolvedValue({
      ...dto.player,
      id: 'any_player_id',
      user: {
        id: 'any_user_id',
        phone: '5598985485698',
        roles: [],
      },
    });
  });

  beforeEach(() => {
    sut = new CreateUserAndPlayerUseCase(
      userRepositoryStub,
      playerRepositoryStub,
    );
  });

  it('should call userRepository.findOne with correct params', async () => {
    await sut.execute(dto);

    expect(userRepositoryStub.findOne).toHaveBeenCalledWith({
      phone: dto.user.phone,
    });
    expect(userRepositoryStub.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw if userRepository.findOne throws', async () => {
    userRepositoryStub.findOne.mockRejectedValueOnce(new Error());

    const promise = sut.execute(dto);

    expect(promise).rejects.toThrow();
  });

  it('should call userRepository.create with correct params', async () => {
    await sut.execute(dto);

    expect(userRepositoryStub.create).toHaveBeenCalledWith(dto.user);
    expect(userRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should call playerRepository.create with correct params', async () => {
    await sut.execute(dto);

    expect(playerRepositoryStub.create).toHaveBeenCalledWith(dto.player);
    expect(playerRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if userRepository.create throws', async () => {
    userRepositoryStub.create.mockRejectedValueOnce(new Error());

    const promise = sut.execute(dto);

    expect(promise).rejects.toThrow();
  });

  it('should throw if playerRepository.create throws', async () => {
    playerRepositoryStub.create.mockRejectedValueOnce(new Error());

    const promise = sut.execute(dto);

    expect(promise).rejects.toThrow();
  });

  it('should register', async () => {
    const result = await sut.execute(dto);

    expect(result).toHaveProperty('id');
    expect(result.user).not.toHaveProperty('password');
    expect(result).toBeTruthy();
  });

  it('should throw if phone is already registered', async () => {
    userRepositoryStub.findOne.mockResolvedValueOnce({
      ...dto.user,
      id: 'any_user_id',
    });

    const promise = sut.execute(dto);

    await expect(promise).rejects.toEqual(
      new AppError('Telefone já cadastrado'),
    );
  });

  it('should throw if score is invalid', async () => {
    const playerWithInvalidScore = { ...dto.player, score: 0 };
    const invalidDto = { ...dto, player: playerWithInvalidScore };

    const promise = sut.execute(invalidDto);

    expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
