import { Location } from '@/domain/entities';

export type CreateMatchDTO = {
  adminId: string;
  groupId: string;
  location?: Location;
  schedulling: Date;
  maxPlayerLimit: number;
  playersPerTeam: number;
};
