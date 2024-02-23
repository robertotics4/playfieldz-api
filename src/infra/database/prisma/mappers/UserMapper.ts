import { IMapper, User, UserPermission } from '@/domain';
import { User as UserModel, UserRole } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class UserMapper implements IMapper<UserModel, User> {
  convert(databaseModel: {
    id: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles: UserRole[];
  }): User {
    const roles = databaseModel.roles
      ? databaseModel.roles.map(r => ({
          groupId: r.groupId,
          permission: r.permission as UserPermission,
        }))
      : [];

    return {
      ...databaseModel,
      roles,
    };
  }
}
