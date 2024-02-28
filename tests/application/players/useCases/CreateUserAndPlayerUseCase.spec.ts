import { MockProxy, mock } from 'jest-mock-extended';
import {
  AppError,
  AttributeName,
  CreateUserAndPlayerDTO,
  ICreateUserAndPlayerUseCase,
  IEncryptor,
  IPlayerRepository,
  IUserRepository,
  PlayerAttribute,
  PlayerPosition,
  User,
} from '@/domain';
import { CreateUserAndPlayerUseCase } from '@/application';

describe('CreateUserAndPlayerUseCase', () => {
  let sut: ICreateUserAndPlayerUseCase;
  let userRepositoryStub: MockProxy<IUserRepository>;
  let playerRepositoryStub: MockProxy<IPlayerRepository>;
  let encryptorStub: MockProxy<IEncryptor>;
  let dto: CreateUserAndPlayerDTO;
  let defaultPlayerAttributes: PlayerAttribute[];

  beforeAll(() => {
    userRepositoryStub = mock();
    playerRepositoryStub = mock();
    encryptorStub = mock();

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
        userId: 'any_user_id',
      },
    };
    defaultPlayerAttributes = [
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

    const { password, ...userWithoutPassword } = dto.user;

    userRepositoryStub.create.mockResolvedValue({
      ...userWithoutPassword,
      id: 'any_user_id',
    } as User);
    playerRepositoryStub.create.mockResolvedValue({
      ...dto.player,
      id: 'any_player_id',
      attributes: defaultPlayerAttributes,
      user: {
        id: 'any_user_id',
        phone: '5598985485698',
        roles: [],
      },
    });
    encryptorStub.hash.mockResolvedValue('encrypted_password');
  });

  beforeEach(() => {
    sut = new CreateUserAndPlayerUseCase(
      userRepositoryStub,
      playerRepositoryStub,
      encryptorStub,
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

    expect(userRepositoryStub.create).toHaveBeenCalledWith({
      ...dto.user,
      password: 'encrypted_password',
    });
    expect(userRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should call playerRepository.create with correct params', async () => {
    await sut.execute(dto);

    expect(playerRepositoryStub.create).toHaveBeenCalledWith({
      ...dto.player,
      attributes: defaultPlayerAttributes,
    });
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

  it('should call encryptor.hash with correct params', async () => {
    await sut.execute(dto);

    expect(encryptorStub.hash).toHaveBeenCalledWith(dto.user.password, 10);
    expect(encryptorStub.hash).toHaveBeenCalledTimes(1);
  });

  it('should throw if encryptor.hash throws', async () => {
    encryptorStub.hash.mockRejectedValueOnce(new Error());

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
});
