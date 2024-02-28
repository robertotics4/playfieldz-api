import { PlayerPosition, UserRole } from '@/domain/entities';

export type CreateUserAndPlayerDTO = {
  user: {
    password: string;
    phone: string;
    roles: UserRole[];
  };
  player: {
    name: string;
    nickname: string;
    age: number;
    position: PlayerPosition;
    userId: string;
  };
};
