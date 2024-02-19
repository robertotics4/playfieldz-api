import { IMapper, Match } from '@/domain';
import { Match as MatchModel } from '@prisma/client';

export class MatchMapper implements IMapper<MatchModel, Match> {
  convert(
    databaseModel: {
      id: string;
      schedulling: Date;
      maxPlayerLimit: number;
      playersPerTeam: number;
      groupId: string;
      createdAt: Date;
      updatedAt: Date;
    } & { location: { latitude: string; longitude: string } },
  ): Match {
    return {
      ...databaseModel,
    };
  }
}
