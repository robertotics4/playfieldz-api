import { ICreatePlayerUseCase, IPlayerRepository, Player } from '@/domain';
import { CreatePlayerDTO } from '@/domain/dtos/players';

export class CreatePlayerUseCase implements ICreatePlayerUseCase {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(dto: CreatePlayerDTO): Promise<Player> {
    return this.playerRepository.create(dto);
  }
}
