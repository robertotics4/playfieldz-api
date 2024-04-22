import { PlayerPosition, UserRole } from '@/domain/entities';

export type CreateUserAndPlayerDTO = {
  user: {
    name: string;
    password: string;
    phone: string;
    roles: UserRole[];
  };
  player: {
    nickname: string;
    age: number;
    position: PlayerPosition;
  };
};
