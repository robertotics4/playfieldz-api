import { UserRole } from '@/domain/entities';

export type ConfirmPlayerPresenceDTO = {
  userRoles: UserRole[];
  playerId: string;
  matchId: string;
};
