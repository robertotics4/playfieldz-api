import { injectable } from 'tsyringe';
import { IMatchRepository, Match } from '@/domain';
import { BaseRepository } from './BaseRepository'; // Importe a classe BaseRepository aqui
import { SingletonConnection } from '../connections';
import { MatchSchema } from '../schemas';

@injectable()
export class MatchRepository
  extends BaseRepository<Match>
  implements IMatchRepository
{
  constructor() {
    const mongooseInstance = SingletonConnection.getInstance().getConnection();
    const matchModel = mongooseInstance.model<Match>('Match', MatchSchema);
    super(matchModel);
  }
}
