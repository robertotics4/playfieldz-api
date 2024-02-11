import { Player } from '@/domain/entities';

export interface IListPlayersUseCase {
  execute(): Promise<Player[]>;
}
