import { GroupPlayer } from '@/domain/entities';

export interface IGroupPlayerRepository {
  create(data: Omit<GroupPlayer, 'id'>): Promise<GroupPlayer>;
}
