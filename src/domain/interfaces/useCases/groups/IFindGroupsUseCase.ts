import { Group } from '@/domain/entities';

export type FindGroupsFilter = {
  _id?: string;
  name?: string;
  createdBy?: string;
};

export interface IFindGroupsUseCase {
  execute(filter: FindGroupsFilter): Promise<Group[]>;
}
