import { CreatePlayerDTO } from '@/domain/dtos';
import { Player } from '@/domain/entities';

export interface ICreatePlayerUseCase {
  execute(dto: CreatePlayerDTO): Promise<Player>;
}
