import { IMapper, IMatchRepository, Match } from '@/domain';
import { PrismaClient, Match as MatchModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MatchRepository implements IMatchRepository {
  constructor(
    @inject('PrismaClient') private prismaClient: PrismaClient,
    @inject('MatchMapper') private matchMapper: IMapper<MatchModel, Match>,
  ) {}

  async create(data: Omit<Match, 'id'>): Promise<Match> {
    const { group, players, ...matchData } = data;

    const created = await this.prismaClient.match.create({
      data: matchData,
    });

    return this.matchMapper.convert(created);
  }

  async findOne(filters: Partial<Match>): Promise<Match | null> {
    const { group, players, ...matchFilters } = filters;

    const match = await this.prismaClient.match.findFirst({
      where: matchFilters,
      include: { group: true, players: true },
    });

    if (!match) {
      return null;
    }

    return this.matchMapper.convert(match);
  }
}
