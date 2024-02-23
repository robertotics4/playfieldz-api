import { inject, injectable } from 'tsyringe';
import {
  AppError,
  CreateMatchDTO,
  ICreateMatchUseCase,
  IMatchRepository,
  IVerifyUserPermissionUseCase,
  Match,
} from '@/domain';

@injectable()
export class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(
    @inject('MatchRepository') private matchRepository: IMatchRepository,
    @inject('VerifyUserPermissionUseCase')
    private verifyUserPermissionUseCase: IVerifyUserPermissionUseCase,
  ) {}

  async execute({
    groupId,
    adminId,
    location,
    maxPlayerLimit,
    playersPerTeam,
    schedulling,
  }: CreateMatchDTO): Promise<Match> {
    const isAdmin = await this.verifyUserPermissionUseCase.execute({
      groupId,
      userId: adminId,
    });

    if (!isAdmin) {
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
