import {
  AppError,
  CreateMatchDTO,
  ICreateMatchUseCase,
  IMatchRepository,
  IVerifyUserPermissionUseCase,
  Match,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(
    @inject('MatchRepository') private matchRepository: IMatchRepository,
    @inject('VerifyUserPermissionUseCase')
    private verifyUserPermissionUseCase: IVerifyUserPermissionUseCase,
  ) {}

  async execute({
    groupId,
    userId,
    location,
    maxPlayerLimit,
    playersPerTeam,
    schedulling,
  }: CreateMatchDTO): Promise<Match> {
    const userHasPermission = await this.verifyUserPermissionUseCase.execute({
      groupId,
      userId,
    });

    if (!userHasPermission) {
      throw new AppError('Usuário sem permissão para esta operação');
    }

    return await this.matchRepository.create({
      groupId,
      location,
      maxPlayerLimit,
      playersPerTeam,
      schedulling,
    });
  }
}
