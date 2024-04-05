import { inject, injectable } from 'tsyringe';
import {
  AddPlayerToGroupDTO,
  AppError,
  IAddPlayerToGroupUseCase,
  IGroupRepository,
  IPlayerRepository,
  IUpdateUserPermissionsUseCase,
  PlayerSubscription,
  UserPermission,
} from '@/domain';
import { Types } from 'mongoose';

@injectable()
export class AddPlayerToGroupUseCase implements IAddPlayerToGroupUseCase {
  constructor(
    @inject('PlayerRepository') private playerRepository: IPlayerRepository,
    @inject('UpdateUserPermissionsUseCase')
    private updateUserPermissionsUseCase: IUpdateUserPermissionsUseCase,
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({
    adminId,
    groupId,
    paymentRecurrence,
    playerId,
  }: AddPlayerToGroupDTO): Promise<PlayerSubscription> {
    const player = await this.playerRepository.findById(playerId);

    if (!player) {
      throw new AppError('Jogador não encontrado');
    }

    const userWithPermissions = await this.updateUserPermissionsUseCase.execute(
      {
        adminId,
        groupId,
        userId: player.userId,
        roles: [
          {
            groupId: new Types.ObjectId(groupId),
            permission: UserPermission.PLAYER,
          },
        ],
      },
    );

    if (!userWithPermissions) {
      throw new AppError(
        'Não foi possível atribuir as permissões para o jogador',
      );
    }

    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new AppError('Grupo não encontrado');
    }

    const playerAlreadyExists = group.playerSubscriptions.find(subscription =>
      subscription.player._id.equals(new Types.ObjectId(playerId)),
    );

    if (playerAlreadyExists) {
      throw new AppError('O jogador já está no grupo');
    }

    const subscription = { player, paymentRecurrence };

    await this.groupRepository.update(groupId, {
      playerSubscriptions: [...group.playerSubscriptions, subscription],
    });

    return subscription;
  }
}
