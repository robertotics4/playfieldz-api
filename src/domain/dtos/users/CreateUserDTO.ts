import { UserRole } from '@/domain/entities';

export type CreateUserDTO = {
  password: string;
  roles: UserRole[];
};
