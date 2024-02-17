import { CreateUserAndPlayerDTO } from '@/domain/dtos';
import { Player } from '@/domain/entities';

export interface ICreateUserAndPlayerUseCase {
  execute(dto: CreateUserAndPlayerDTO): Promise<Player>;
}
