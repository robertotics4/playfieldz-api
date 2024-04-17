import { inject, injectable } from 'tsyringe';
import {
  AppError,
  Group,
  IGroupRepository,
  IListGroupsUseCase,
  IUserRepository,
} from '@/domain';
import { Types } from 'mongoose';

@injectable()
export class ListGroupsUseCase implements IListGroupsUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('GroupRepository') private groupRepository: IGroupRepository,
  ) {}

  async execute(userId: string): Promise<Group[]> {
    const user = await this.userRepository.findOne({
      _id: new Types.ObjectId(userId),
    });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    return this.groupRepository.list();
  }
}
