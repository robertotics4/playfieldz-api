import { randomUUID } from 'node:crypto';
import { IPlayerRepository, Player } from '@/domain';

export class PlayerRepositoryInMemory implements IPlayerRepository {
  private readonly players: Player[] = [];

  async create(data: Omit<Player, 'id'>): Promise<Player> {
    const newPlayer = new Player({
      ...data,
      id: randomUUID(),
    });

    this.players.push(newPlayer);

    return newPlayer;
  }

  async list(): Promise<Player[]> {
    return this.players;
  }

  async update(id: string, data: Omit<Player, 'id'>): Promise<Player | null> {
    const playerIndex = this.players.findIndex(player => player.id === id);

    if (playerIndex === -1) {
      return null;
    }

    const updatedPlayer = { ...this.players[playerIndex], ...data };
    this.players[playerIndex] = updatedPlayer;

    return updatedPlayer;
  }

  async delete(id: string): Promise<boolean> {
    const playerIndex = this.players.findIndex(player => player.id === id);

    if (playerIndex === -1) {
      return false;
    }

    this.players.splice(playerIndex, 1);
    return true;
  }
}
