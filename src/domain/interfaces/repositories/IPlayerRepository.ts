import { Player } from '@/domain/entities';

export interface IPlayerRepository {
  create(data: Omit<Player, 'id'>): Promise<Player>;
  list(): Promise<Player[]>;
  delete(id: string): Promise<boolean>;
  findOne(filters: Partial<Player>): Promise<Player | null>;
}
