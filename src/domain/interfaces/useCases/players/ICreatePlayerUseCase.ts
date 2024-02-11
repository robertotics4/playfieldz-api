import { CreatePlayerDTO } from '@/domain/dtos/players/CreatePlayerDTO';
import { Player } from '@/domain/entities';

export interface ICreatePlayerUseCase {
  execute(dto: CreatePlayerDTO): Promise<Player>;
}
