import { IPlayerRepository, Player, PlayerPosition } from '@/domain';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async create(data: Omit<Player, 'id'>): Promise<Player> {
    const createdPlayer = await this.prismaClient.player.create({
      data: {
        age: data.age,
        name: data.name,
        nickname: data.nickname,
        score: data.score,
        userId: data.userId,
        groupsId: data.groupsId,
        position: data.position.toString(),
      },
    });

    return new Player({
      ...createdPlayer,
      position: createdPlayer.position as PlayerPosition,
    });
  }

  async list(): Promise<Player[]> {
    const players = await this.prismaClient.player.findMany({});

    return players.map(p => ({ ...p, position: p.position as PlayerPosition }));
  }

  async update(id: string, data: Partial<Player>): Promise<Player | null> {
    const updatedPlayer = await this.prismaClient.player.update({
      where: { id },
      data,
    });

    return new Player({
      ...updatedPlayer,
      position: updatedPlayer.position as PlayerPosition,
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prismaClient.player.delete({
      where: { id },
    });

    return true;
  }
}
