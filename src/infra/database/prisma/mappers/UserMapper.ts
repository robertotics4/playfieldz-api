import { IMapper, User, UserPermission } from '@/domain';
import { User as UserModel } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class UserMapper implements IMapper<UserModel, User> {
  convert(
    databaseModel: {
      id: string;
      phone: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    } & { roles: { groupId: string; permission: string }[] },
  ): User {
    return {
      ...databaseModel,
      roles: databaseModel.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    };
  }
}
