import { Player } from '@/domain/entities';
import { IBaseRepository } from './IBaseRepository';

export type IPlayerRepository = IBaseRepository<Player>;
