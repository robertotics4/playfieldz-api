import { Group, IMapper, UserPermission } from '@/domain';
import { Group as GroupModel, User } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class GroupMapper implements IMapper<GroupModel, Group> {
  convert(databaseModel: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    creator: User;
  }): Group {
    const { creator, ...groupData } = databaseModel;

    const group: Group = {
      ...groupData,
      description: databaseModel.description || undefined,
      imageUrl: databaseModel.description || undefined,
    };

    group.creator = {
      ...databaseModel.creator,
      roles: databaseModel.creator.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    };

    return group;
  }
}
