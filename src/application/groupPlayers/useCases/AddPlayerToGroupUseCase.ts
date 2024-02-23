import { inject, injectable } from 'tsyringe';
import {
  AddPlayerToGroupDTO,
  AppError,
  GroupPlayer,
  IAddPlayerToGroupUseCase,
  IGroupPlayerRepository,
  IPlayerRepository,
  IUpdateUserPermissionsUseCase,
  UserPermission,
} from '@/domain';

@injectable()
export class AddPlayerToGroupUseCase implements IAddPlayerToGroupUseCase {
  constructor(
    @inject('PlayerRepository') private playerRepository: IPlayerRepository,
    @inject('UpdateUserPermissionsUseCase')
    private updateUserPermissionsUseCase: IUpdateUserPermissionsUseCase,
    @inject('GroupPlayerRepository')
    private groupPlayerRepository: IGroupPlayerRepository,
  ) {}

  async execute({
    adminId,
    groupId,
    paymentRecurrence,
    playerId,
  }: AddPlayerToGroupDTO): Promise<GroupPlayer> {
    const player = await this.playerRepository.findOne({ id: playerId });

    if (!player) {
      throw new AppError('Jogador não encontrado');
    }

    const userWithPermissions = await this.updateUserPermissionsUseCase.execute(
      {
        adminId,
        groupId,
        userId: player.userId,
        roles: [{ groupId, permission: UserPermission.PLAYER }],
      },
    );

    if (!userWithPermissions) {
      throw new AppError(
        'Não foi possível atribuir as permissões para o jogador',
      );
    }

    const playerAlreadyExists = await this.groupPlayerRepository.findOne({
      playerId,
    });

    if (playerAlreadyExists) {
      throw new AppError('O jogador já está no grupo');
    }

    return await this.groupPlayerRepository.create({
      groupId,
      playerId,
      paymentRecurrence,
    });
  }
}
