import { Group, IGroupRepository } from '@/domain';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GroupRepository implements IGroupRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async create(data: Omit<Group, 'id'>): Promise<Group> {
    const created = await this.prismaClient.group.create({
      data,
    });

    return new Group({
      ...created,
      description: created.description || undefined,
      imageUrl: created.description || undefined,
    });
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
