import { Match } from '@/domain/entities';

export interface IMatchRepository {
  create(data: Omit<Match, 'id'>): Promise<Match>;
  findOne(filters: Partial<Match>): Promise<Match | null>;
  list(): Promise<Match[]>;
}
