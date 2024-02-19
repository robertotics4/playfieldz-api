import { inject, injectable } from 'tsyringe';
import {
  AddPlayerToGroupDTO,
  AppError,
  Group,
  IAddPlayerToGroupUseCase,
  IGroupPlayerRepository,
  IGroupRepository,
  IUserRepository,
  User,
  UserPermission,
} from '@/domain';

@injectable()
export class AddPlayerToGroupUseCase implements IAddPlayerToGroupUseCase {
  constructor(
    @inject('GroupRepository') private groupRepository: IGroupRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('GroupPlayerRepository')
    private groupPlayerRepository: IGroupPlayerRepository,
  ) {}

  async execute({
    userId,
    playerId,
    groupId,
    paymentRecurrence,
  }: AddPlayerToGroupDTO): Promise<boolean> {
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

    await this.groupPlayerRepository.create({
      groupId: group.id,
      playerId,
      paymentRecurrence,
    });

    return true;
  }

  private verifyIfUserHasPermission(user: User, group: Group): boolean {
    const hasPermission = user.roles.some(r => {
      return r.groupId === group.id && r.permission === UserPermission.ADMIN;
    });

    return hasPermission;
  }
}
