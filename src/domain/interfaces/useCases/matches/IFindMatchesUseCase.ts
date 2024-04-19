import { Match } from '@/domain/entities';

export type FindMatchesFilter = {
  _id?: string;
  group?: string;
};

export interface IFindMatchesUseCase {
  execute(filter: FindMatchesFilter): Promise<Match[]>;
}
