import { injectable } from 'tsyringe';
import { GroupPlayer, IMapper, PlayerPaymentRecurrence } from '@/domain';
import { GroupPlayer as GroupPlayerModel } from '@prisma/client';

@injectable()
export class GroupPlayerMapper
  implements IMapper<GroupPlayerModel, GroupPlayer>
{
  constructor() {}

  convert(databaseModel: {
    id: string;
    groupId: string;
    playerId: string;
    createdAt: Date;
    updatedAt: Date;
    paymentRecurrence: string;
  }): GroupPlayer {
    return {
      ...databaseModel,
      paymentRecurrence:
        databaseModel.paymentRecurrence as PlayerPaymentRecurrence,
    };
  }
}
