import { Group, IGroupRepository, UserPermission } from '@/domain';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GroupRepository implements IGroupRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async create(data: Omit<Group, 'id'>): Promise<Group> {
    const { creator, ...groupData } = data;

    const created = await this.prismaClient.group.create({
      data: groupData,
      include: { creator: true },
    });

    const newGroup = new Group({
      ...created,
      description: created.description || undefined,
      imageUrl: created.description || undefined,
    });

    newGroup.creator = {
      ...created.creator,
      roles: created.creator.roles.map(r => ({
        groupId: r.groupId,
        permission: r.permission as UserPermission,
      })),
    };

    return newGroup;
  }

  async list(): Promise<Group[]> {
    const groups = await this.prismaClient.group.findMany({});

    return groups.map(g => ({
      ...g,
      description: g.description || undefined,
      imageUrl: g.imageUrl || undefined,
    }));
  }
}
