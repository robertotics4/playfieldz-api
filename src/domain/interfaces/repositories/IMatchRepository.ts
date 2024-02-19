import { Match } from '@/domain/entities';

export interface IMatchRepository {
  create(data: Omit<Match, 'id'>): Promise<Match>;
}
