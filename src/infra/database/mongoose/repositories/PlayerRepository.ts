import { injectable } from 'tsyringe';
import { IPlayerRepository, Player } from '@/domain';
import { BaseRepository } from './BaseRepository'; // Importe a classe BaseRepository aqui
import { SingletonConnection } from '../connections';
import { PlayerSchema } from '../schemas';

@injectable()
export class PlayerRepository
  extends BaseRepository<Player>
  implements IPlayerRepository
{
  constructor() {
    const mongooseInstance = SingletonConnection.getInstance().getConnection();
    const playerModel = mongooseInstance.model<Player>('Player', PlayerSchema);
    super(playerModel);
  }
}
