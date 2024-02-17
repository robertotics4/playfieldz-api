import {
  AppError,
  CreateGroupDTO,
  Group,
  IGroupRepository,
  IUserRepository,
  User,
  UserPermission,
} from '@/domain';
import { ICreateGroupUseCase } from '@/domain/interfaces/useCases/groups/ICreateGroupUseCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateGroupUseCase implements ICreateGroupUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('GroupRepository') private groupRepository: IGroupRepository,
  ) {}

  async execute(dto: CreateGroupDTO): Promise<Group> {
    const user = await this.userRepository.findOne({ id: dto.userId });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const createdGroup = await this.groupRepository.create({
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      createdBy: dto.userId,
    });

    if (!createdGroup) {
      throw new AppError('Falha na criação do grupo');
    }

    const updatedUser = await this.userRepository.update(user.id, {
      roles: [
        ...user.roles,
        { groupId: createdGroup.id, permission: UserPermission.ADMIN },
      ],
    });

    createdGroup.creator = { ...updatedUser, password: undefined } as Omit<
      User,
      'password'
    >;

    return createdGroup;
  }
}
