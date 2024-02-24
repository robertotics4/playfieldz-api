import { Match } from '@/domain/entities';

export interface IListMatchesUseCase {
  execute(): Promise<Match[]>;
}
