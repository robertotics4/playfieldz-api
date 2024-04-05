import { inject, injectable } from 'tsyringe';
import {
  AppError,
  AttributeName,
  CreateUserAndPlayerDTO,
  IEncryptor,
  IPlayerRepository,
  Player,
  PlayerAttribute,
} from '@/domain';
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository';
import { ICreateUserAndPlayerUseCase } from '@/domain/interfaces/useCases/players/ICreateUserAndPlayerUseCase';

@injectable()
export class CreateUserAndPlayerUseCase implements ICreateUserAndPlayerUseCase {
  private readonly ENCRYPT_SALTS = 10;

  private readonly DEFAULT_ATTRIBUTE_VALUE = 5;

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('PlayerRepository') private playerRepository: IPlayerRepository,
    @inject('Encryptor') private encryptor: IEncryptor,
  ) {}

  async execute(dto: CreateUserAndPlayerDTO): Promise<Player> {
    const existentUser = await this.userRepository.findOne({
      phone: dto.user.phone,
    });

    if (existentUser) {
      throw new AppError('Telefone já cadastrado');
    }

    const encryptedPassword = await this.encryptor.hash(
      dto.user.password,
      this.ENCRYPT_SALTS,
    );

    const user = await this.userRepository.create({
      ...dto.user,
      password: encryptedPassword,
    });

    const defaultPlayerAttributes = this.getDefaultPlayerAttributes();

    const player = await this.playerRepository.create({
      ...dto.player,
      userId: String(user._id),
      attributes: defaultPlayerAttributes,
    });

    await this.userRepository.update(user._id, {
      player,
    });

    return player;
  }

  private getDefaultPlayerAttributes(): PlayerAttribute[] {
    return [
      {
        name: AttributeName.DEFENSE,
        value: this.DEFAULT_ATTRIBUTE_VALUE,
      },
      {
        name: AttributeName.ASSISTING,
        value: this.DEFAULT_ATTRIBUTE_VALUE,
      },
      {
        name: AttributeName.DRIBBLING,
        value: this.DEFAULT_ATTRIBUTE_VALUE,
      },
      {
        name: AttributeName.SHOOTING,
        value: this.DEFAULT_ATTRIBUTE_VALUE,
      },
      {
        name: AttributeName.SKILLS,
        value: this.DEFAULT_ATTRIBUTE_VALUE,
      },
    ];
  }
}
