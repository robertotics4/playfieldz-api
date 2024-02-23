import { Group, IMapper, User } from '@/domain';
import { Group as GroupModel, User as UserModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GroupMapper implements IMapper<GroupModel, Group> {
  constructor(
    @inject('UserMapper') private userMapper: IMapper<UserModel, User>,
  ) {}

  convert(databaseModel: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    creator: UserModel;
  }): Group {
    const { creator, ...groupData } = databaseModel;

    const group: Group = {
      ...groupData,
      description: databaseModel.description || undefined,
      imageUrl: databaseModel.description || undefined,
    };

    const userWithoutPassword = {
      ...this.userMapper.convert(databaseModel.creator),
      password: undefined,
    };

    group.creator = userWithoutPassword;

    return group;
  }
}
