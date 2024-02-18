import { Group, IGroupRepository, IMapper } from '@/domain';
import { PrismaClient, Group as GroupModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GroupRepository implements IGroupRepository {
  constructor(
    @inject('PrismaClient') private prismaClient: PrismaClient,
    @inject('GroupMapper') private groupMapper: IMapper<GroupModel, Group>,
  ) {}

  async create(data: Omit<Group, 'id'>): Promise<Group> {
    const { creator, ...groupData } = data;

    const created = await this.prismaClient.group.create({
      data: groupData,
      include: { creator: true },
    });

    return this.groupMapper.convert(created);
  }

  async list(): Promise<Group[]> {
    const groups = await this.prismaClient.group.findMany({
      include: { creator: true },
    });

    return groups.map(g => this.groupMapper.convert(g));
  }

  async findOne(filters: Partial<Group>): Promise<Group | null> {
    const group = await this.prismaClient.group.findFirst({
      where: filters,
    });

    if (group === null) {
      return null;
    }

    return this.groupMapper.convert(group);
  }
}
