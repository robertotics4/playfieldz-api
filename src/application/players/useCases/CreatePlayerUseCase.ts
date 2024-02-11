import {
  AppError,
  ICreatePlayerUseCase,
  IPlayerRepository,
  Player,
} from '@/domain';
import { CreatePlayerDTO } from '@/domain/dtos/players';

export class CreatePlayerUseCase implements ICreatePlayerUseCase {
  private readonly PLAYER_SCORE_MIN = 1;

  private readonly PLAYER_SCORE_MAX = 5;

  constructor(private playerRepository: IPlayerRepository) {}

  async execute(dto: CreatePlayerDTO): Promise<Player> {
    if (
      dto.score < this.PLAYER_SCORE_MIN ||
      dto.score > this.PLAYER_SCORE_MAX
    ) {
      throw new AppError(
        `Score inválido (mínimo ${this.PLAYER_SCORE_MIN} e máximo ${this.PLAYER_SCORE_MAX})`,
      );
    }

    return this.playerRepository.create(dto);
  }
}
