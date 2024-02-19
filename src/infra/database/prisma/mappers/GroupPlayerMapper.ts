import { GroupPlayer, IMapper, PlayerPaymentRecurrence } from '@/domain';
import { GroupPlayer as GroupPlayerModel } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class GroupPlayerMapper
  implements IMapper<GroupPlayerModel, GroupPlayer>
{
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
