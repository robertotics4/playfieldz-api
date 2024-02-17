import { IMapper, IPlayerRepository, Player } from '@/domain';
import { PrismaClient, Player as PlayerModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(
    @inject('PrismaClient') private prismaClient: PrismaClient,
    @inject('PlayerMapper') private playerMapper: IMapper<PlayerModel, Player>,
  ) {}

  async create(data: Omit<Player, 'id'>): Promise<Player> {
    const { user, ...playerData } = data;

    const created = await this.prismaClient.player.create({
      data: {
        ...playerData,
        position: data.position.toString(),
      },
      include: { user: true },
    });

    return this.playerMapper.convert(created);
  }

  async list(): Promise<Player[]> {
    const players = await this.prismaClient.player.findMany({
      include: { user: true },
    });

    return players.map(p => this.playerMapper.convert(p));
  }

  async delete(id: string): Promise<boolean> {
    await this.prismaClient.player.delete({
      where: { id },
    });

    return true;
  }
}
