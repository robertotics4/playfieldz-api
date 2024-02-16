import { IUserRepository, User, UserPermission } from '@/domain';
import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async create(data: Omit<User, 'id'>): Promise<User> {
    const created = await this.prismaClient.user.create({
      data,
    });

    return new User({
      ...created,
      roles: created.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    });
  }

  async findOne(filters: Partial<User>): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: filters,
    });

    if (user === null) {
      return null;
    }

    return new User({
      ...user,
      roles: user.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    });
  }

  async list(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany({});

    return users.map(user => ({
      ...user,
      roles: user.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    }));
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updated = await this.prismaClient.user.update({
      where: { id },
      data,
    });

    return new User({
      ...updated,
      roles: updated.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prismaClient.user.delete({
      where: { id },
    });

    return true;
  }
}
