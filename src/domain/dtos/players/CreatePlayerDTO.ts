import { PlayerPosition } from '@/domain/entities';

export type CreatePlayerDTO = {
  name: string;
  nickname: string;
  age: number;
  position: PlayerPosition;
  score: number;
  phone: string;
  groupsId: string[];
  userId: string;
};
