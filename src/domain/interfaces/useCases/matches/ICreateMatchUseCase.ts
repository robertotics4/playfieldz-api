import { CreateMatchDTO } from '@/domain/dtos';
import { Match } from '@/domain/entities';

export interface ICreateMatchUseCase {
  execute(dto: CreateMatchDTO): Promise<Match>;
}
