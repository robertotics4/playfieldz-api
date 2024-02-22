import { PlayerPaymentRecurrence, UserRole } from '@/domain/entities';

export type AddPlayerToGroupDTO = {
  userId: string;
  userRoles: UserRole[];
  playerId: string;
  groupId: string;
  paymentRecurrence: PlayerPaymentRecurrence;
};
