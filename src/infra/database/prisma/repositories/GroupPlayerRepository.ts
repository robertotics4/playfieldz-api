import { GroupPlayer, IGroupPlayerRepository, IMapper } from '@/domain';
import { PrismaClient, GroupPlayer as GroupPlayerModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GroupPlayerRepository implements IGroupPlayerRepository {
  constructor(
    @inject('PrismaClient') private prismaClient: PrismaClient,
    @inject('GroupPlayerMapper')
    private groupPlayerMapper: IMapper<GroupPlayerModel, GroupPlayer>,
  ) {}

  async create(data: Omit<GroupPlayer, 'id'>): Promise<GroupPlayer> {
    const { group, player, ...groupPlayerData } = data;

    const created = await this.prismaClient.groupPlayer.create({
      data: groupPlayerData,
    });

    return this.groupPlayerMapper.convert(created);
  }
}
