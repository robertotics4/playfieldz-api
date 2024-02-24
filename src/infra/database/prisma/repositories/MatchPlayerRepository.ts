import { IMapper, IMatchPlayerRepository, MatchPlayer } from '@/domain';
import { PrismaClient, MatchPlayer as MatchPlayerModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MatchPlayerRepository implements IMatchPlayerRepository {
  constructor(
    @inject('PrismaClient') private prismaClient: PrismaClient,
    @inject('MatchPlayerMapper')
    private matchPlayerMapper: IMapper<MatchPlayerModel, MatchPlayer>,
  ) {}

  async create(data: Omit<MatchPlayer, 'id'>): Promise<MatchPlayer> {
    const { match, player, ...matchPlayerData } = data;

    const created = await this.prismaClient.matchPlayer.create({
      data: matchPlayerData,
    });

    return this.matchPlayerMapper.convert(created);
  }

  async findOne(filters: Partial<MatchPlayer>): Promise<MatchPlayer | null> {
    const { match, player, ...matchPlayerFilters } = filters;
    const matchPlayer = await this.prismaClient.matchPlayer.findFirst({
      where: matchPlayerFilters,
      include: { match: true, player: true },
    });

    if (!matchPlayer) {
      return null;
    }

    return this.matchPlayerMapper.convert(matchPlayer);
  }
}
