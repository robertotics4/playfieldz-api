import {
  AppError,
  CreateMatchDTO,
  Group,
  ICreateMatchUseCase,
  IGroupRepository,
  IMatchRepository,
  IUserRepository,
  Match,
  User,
  UserPermission,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(
    @inject('GroupRepository') private groupRepository: IGroupRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('MatchRepository') private matchRepository: IMatchRepository,
  ) {}

  async execute({
    groupId,
    userId,
    location,
    maxPlayerLimit,
    playersPerTeam,
    schedulling,
  }: CreateMatchDTO): Promise<Match> {
    const group = await this.groupRepository.findOne({ id: groupId });

    if (!group) {
      throw new AppError('Grupo não encontrado');
    }

    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const hasPermission = this.verifyIfUserHasPermission(user, group);

    if (!hasPermission) {
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

  private verifyIfUserHasPermission(user: User, group: Group): boolean {
    const hasPermission = user.roles.some(r => {
      return r.groupId === group.id && r.permission === UserPermission.ADMIN;
    });

    return hasPermission;
  }
}
