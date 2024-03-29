import { Group } from '@/domain/entities';

export interface IGroupRepository {
  create(data: Omit<Group, 'id'>): Promise<Group>;
  list(): Promise<Group[]>;
  findOne(filters: Partial<Group>): Promise<Group | null>;
}
