import { IListMatchesUseCase, IMatchRepository, Match } from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListMatchesUseCase implements IListMatchesUseCase {
  constructor(
    @inject('MatchRepository') private matchRepository: IMatchRepository,
  ) {}

  async execute(): Promise<Match[]> {
    return await this.matchRepository.list();
  }
}
