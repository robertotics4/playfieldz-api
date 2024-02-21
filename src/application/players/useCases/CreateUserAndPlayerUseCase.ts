import { inject, injectable } from 'tsyringe';
import {
  AppError,
  CreateUserAndPlayerDTO,
  IEncryptor,
  IPlayerRepository,
  Player,
} from '@/domain';
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository';
import { ICreateUserAndPlayerUseCase } from '@/domain/interfaces/useCases/players/ICreateUserAndPlayerUseCase';

@injectable()
export class CreateUserAndPlayerUseCase implements ICreateUserAndPlayerUseCase {
  private readonly PLAYER_SCORE_MIN = 1;

  private readonly PLAYER_SCORE_MAX = 5;

  private readonly ENCRYPT_SALTS = 10;

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

    if (
      dto.player.score < this.PLAYER_SCORE_MIN ||
      dto.player.score > this.PLAYER_SCORE_MAX
    ) {
      throw new AppError(
        `Score inválido (mínimo ${this.PLAYER_SCORE_MIN} e máximo ${this.PLAYER_SCORE_MAX})`,
      );
    }

    const encryptedPassword = await this.encryptor.hash(
      dto.user.password,
      this.ENCRYPT_SALTS,
    );

    const user = await this.userRepository.create({
      ...dto.user,
      password: encryptedPassword,
    });

    const player = await this.playerRepository.create({
      ...dto.player,
      userId: user.id,
    });

    return player;
  }
}
