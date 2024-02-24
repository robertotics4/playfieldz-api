import { MatchPlayer } from '@/domain/entities';

export interface IMatchPlayerRepository {
  create(data: Omit<MatchPlayer, 'id'>): Promise<MatchPlayer>;
  findOne(filters: Partial<MatchPlayer>): Promise<MatchPlayer | null>;
}
