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
  private readonly MIN_TIME_SCHEDULLING_LIMIT_IN_HOURS = 1;

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

    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new AppError('Grupo não encontrado');
    }

    if (!this.isValidSchedulling(schedulling)) {
      throw new AppError(
        `A data do agendamento deve ser pelo menos ${this.MIN_TIME_SCHEDULLING_LIMIT_IN_HOURS} hora(s) após o momento atual`,
      );
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

  private isValidSchedulling(scheduling: Date | string): boolean {
    let schedullingDate = scheduling;

    if (typeof schedullingDate === 'string') {
      schedullingDate = new Date(scheduling);

      if (Number.isNaN(schedullingDate.getTime())) {
        return false;
      }
    }

    const now = new Date();
    const limitInHours = this.MIN_TIME_SCHEDULLING_LIMIT_IN_HOURS * 60;
    const oneHourLater = new Date(now.getTime() + limitInHours * 60 * 1000);
    return schedullingDate.getTime() > oneHourLater.getTime();
  }
}
