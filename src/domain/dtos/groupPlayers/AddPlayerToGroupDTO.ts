import { PlayerPaymentRecurrence } from '@/domain/entities';

export type AddPlayerToGroupDTO = {
  adminId: string;
  playerId: string;
  groupId: string;
  paymentRecurrence: PlayerPaymentRecurrence;
};
