import { Group } from '@/domain/entities';

export interface IListGroupsUseCase {
  execute(userId: string): Promise<Group[]>;
}
