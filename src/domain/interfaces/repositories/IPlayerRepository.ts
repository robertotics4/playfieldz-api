import { Player } from '@/domain/entities';

export interface IPlayerRepository {
  create(data: Omit<Player, 'id'>): Promise<Player>;
  list(): Promise<Player[]>;
  update(id: string, data: Omit<Player, 'id'>): Promise<Player | null>;
  delete(id: string): Promise<boolean>;
}
