import {
  AppError,
  CreateGroupDTO,
  Group,
  IGroupRepository,
  IUserRepository,
  UserPermission,
} from '@/domain';
import { ICreateGroupUseCase } from '@/domain/interfaces/useCases/groups/ICreateGroupUseCase';
import { Types } from 'mongoose';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateGroupUseCase implements ICreateGroupUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('GroupRepository') private groupRepository: IGroupRepository,
  ) {}

  async execute(dto: CreateGroupDTO): Promise<Group> {
    const user = await this.userRepository.findOne({
      _id: new Types.ObjectId(dto.userId),
    });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const createdGroup = await this.groupRepository.create({
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      createdBy: user,
      playerSubscriptions: [],
    });

    if (!createdGroup) {
      throw new AppError('Falha na criação do grupo');
    }

    await this.userRepository.update(user._id, {
      roles: [
        ...user.roles,
        { groupId: createdGroup._id, permission: UserPermission.ADMIN },
      ],
    });

    return createdGroup;
  }
}
