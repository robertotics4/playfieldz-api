import { Group } from '@/domain/entities';

export interface IGroupRepository {
  create(data: Omit<Group, 'id'>): Promise<Group>;
  list(): Promise<Group[]>;
  update(id: string, data: Partial<Group>): Promise<Group | null>;
  delete(id: string): Promise<boolean>;
}
