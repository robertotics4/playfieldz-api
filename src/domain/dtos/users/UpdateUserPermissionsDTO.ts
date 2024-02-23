import { UserRole } from '@/domain/entities';

export type UpdateUserPermissionsDTO = {
  adminId: string;
  groupId: string;
  userId: string;
  roles: UserRole[];
};
