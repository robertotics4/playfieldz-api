import {
  FindMatchesFilter,
  IFindMatchesUseCase,
  IMatchRepository,
  Match,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindMatchesUseCase implements IFindMatchesUseCase {
  constructor(
    @inject('MatchRepository') private matchRepository: IMatchRepository,
  ) {}

  async execute(filter: FindMatchesFilter): Promise<Match[]> {
    return await this.matchRepository.find(filter);
  }
}
