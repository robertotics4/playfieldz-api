import { IMapper, MatchPlayer } from '@/domain';
import { MatchPlayer as MatchPlayerModel } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class MatchPlayerMapper
  implements IMapper<MatchPlayerModel, MatchPlayer>
{
  convert(databaseModel: {
    id: string;
    playerId: string;
    matchId: string;
  }): MatchPlayer {
    return { ...databaseModel };
  }
}
