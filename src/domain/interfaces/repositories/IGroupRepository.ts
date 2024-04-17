import { Group } from '@/domain/entities';
import { IBaseRepository } from './IBaseRepository';

export interface IGroupRepository extends IBaseRepository<Group> {
  findByCreatedBy(userId: string): Promise<Group[]>;
}
