import {
  AppError,
  IUpdateUserPermissionsUseCase,
  IUserRepository,
  IVerifyUserPermissionUseCase,
  UpdateUserPermissionsDTO,
  User,
  UserRole,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateUserPermissionsUseCase
  implements IUpdateUserPermissionsUseCase
{
  constructor(
    @inject('VerifyUserPermissionUseCase')
    private verifyUserPermissionUseCase: IVerifyUserPermissionUseCase,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({
    adminId,
    groupId,
    userId,
    roles,
  }: UpdateUserPermissionsDTO): Promise<User> {
    const isAdmin = await this.verifyUserPermissionUseCase.execute({
      groupId,
      userId: adminId,
    });

    if (!isAdmin) {
      throw new AppError('Usuário sem permissão para esta operação');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const nonExistentRoles = this.getNonExistentRoles(user.roles, roles);

    if (!nonExistentRoles.length) {
      return user;
    }

    const updatedUser = await this.userRepository.update(user._id, {
      roles: [...user.roles, ...nonExistentRoles],
    });

    return updatedUser as User;
  }

  private getNonExistentRoles(
    userRoles: UserRole[],
    rolesToCheck: UserRole[],
  ): UserRole[] {
    const nonExistentRoles = rolesToCheck.filter(roleToCheck => {
      return !userRoles.some(
        userRole =>
          userRole.groupId === roleToCheck.groupId &&
          userRole.permission === roleToCheck.permission,
      );
    });

    return nonExistentRoles;
  }
}
