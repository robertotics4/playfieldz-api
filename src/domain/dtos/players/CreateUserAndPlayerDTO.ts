import { PlayerPosition } from '@/domain/entities';

export type CreateUserAndPlayerDTO = {
  user: {
    password: string;
    phone: string;
  };
  player: {
    name: string;
    nickname: string;
    age: number;
    position: PlayerPosition;
    score: number;
    groupsId: string[];
    userId: string;
  };
};
