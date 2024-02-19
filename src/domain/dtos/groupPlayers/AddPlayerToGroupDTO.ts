import { PlayerPaymentRecurrence } from '@/domain/entities';

export type AddPlayerToGroupDTO = {
  userId: string;
  playerId: string;
  groupId: string;
  paymentRecurrence: PlayerPaymentRecurrence;
};
