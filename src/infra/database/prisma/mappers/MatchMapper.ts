import {
  Group,
  GroupPlayer,
  IMapper,
  Match,
  PlayerPaymentRecurrence,
} from '@/domain';
import {
  Match as MatchModel,
  Group as GroupModel,
  GroupPlayer as GroupPlayerModel,
} from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MatchMapper implements IMapper<MatchModel, Match> {
  constructor(
    @inject('GroupMapper') private groupMapper: IMapper<GroupModel, Group>,
  ) {}

  convert(
    databaseModel: {
      id: string;
      schedulling: Date;
      maxPlayerLimit: number;
      playersPerTeam: number;
      groupId: string;
      createdAt: Date;
      updatedAt: Date;
      group: GroupModel;
      players: GroupPlayerModel[];
    } & { location: { latitude: string; longitude: string } },
  ): Match {
    const players: GroupPlayer[] = databaseModel.players.map(p => ({
      ...p,
      paymentRecurrence: p.paymentRecurrence as PlayerPaymentRecurrence,
    }));

    return {
      ...databaseModel,
      group: this.groupMapper.convert(databaseModel.group),
      players,
    };
  }
}
