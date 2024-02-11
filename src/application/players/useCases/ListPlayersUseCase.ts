import { IPlayerRepository, Player } from '@/domain';
import { IListPlayersUseCase } from '@/domain/interfaces/useCases/players/IListPlayersUseCase';

export class ListPlayersUseCase implements IListPlayersUseCase {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(): Promise<Player[]> {
    return await this.playerRepository.list();
  }
}
