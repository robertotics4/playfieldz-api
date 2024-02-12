import { inject, injectable } from 'tsyringe';
import { IPlayerRepository, Player } from '@/domain';
import { IListPlayersUseCase } from '@/domain/interfaces/useCases/players/IListPlayersUseCase';

@injectable()
export class ListPlayersUseCase implements IListPlayersUseCase {
  constructor(
    @inject('PlayerRepository') private playerRepository: IPlayerRepository,
  ) {}

  async execute(): Promise<Player[]> {
    return await this.playerRepository.list();
  }
}
