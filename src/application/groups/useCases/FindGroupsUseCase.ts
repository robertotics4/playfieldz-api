import {
  FindGroupsFilter,
  Group,
  IFindGroupsUseCase,
  IGroupRepository,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindGroupsUseCase implements IFindGroupsUseCase {
  constructor(
    @inject('GroupRepository') private groupRepository: IGroupRepository,
  ) {}

  async execute(filter: FindGroupsFilter): Promise<Group[]> {
    return await this.groupRepository.find(filter);
  }
}
