import { inject, injectable } from 'tsyringe';
import {
  AppError,
  Group,
  IGroupRepository,
  IUserRepository,
  IVerifyUserPermissionUseCase,
  User,
  UserPermission,
  VerifyUserPermissionDTO,
} from '@/domain';

@injectable()
export class VerifyUserPermissionUseCase
  implements IVerifyUserPermissionUseCase
{
  constructor(
    @inject('GroupRepository') private groupRepository: IGroupRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({
    groupId,
    userId,
  }: VerifyUserPermissionDTO): Promise<boolean> {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new AppError('Grupo não encontrado');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const hasPermission = this.verifyPermission(user, group);

    if (!hasPermission) {
      return false;
    }

    return true;
  }

  private verifyPermission(user: User, group: Group): boolean {
    const hasPermission = user.roles.some(r => {
      return r.groupId === group._id && r.permission === UserPermission.ADMIN;
    });

    return hasPermission;
  }
}
