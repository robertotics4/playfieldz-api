import { Match } from '@/domain/entities';

export type FindMatchesFilter = {
  _id?: string;
};

export interface IFindMatchesUseCase {
  execute(filter: FindMatchesFilter): Promise<Match[]>;
}
