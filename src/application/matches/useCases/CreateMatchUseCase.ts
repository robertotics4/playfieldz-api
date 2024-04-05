import { inject, injectable } from 'tsyringe';
import {
  AppError,
  CreateMatchDTO,
  ICreateMatchUseCase,
  IGroupRepository,
  IMatchRepository,
  IVerifyUserPermissionUseCase,
  Match,
} from '@/domain';

@injectable()
export class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(
    @inject('MatchRepository') private matchRepository: IMatchRepository,
    @inject('GroupRepository') private groupRepository: IGroupRepository,
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

    const group = await this.groupRepository.findOne({ _id: groupId });

    if (!group) {
      throw new AppError('Grupo não encontrado');
    }

    return await this.matchRepository.create({
      group,
      location,
      maxPlayerLimit,
      playersPerTeam,
      schedulling,
      matchPlayers: [],
    });
  }
}
