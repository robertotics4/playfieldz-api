import { inject, injectable } from 'tsyringe';
import {
  AddPlayerToGroupDTO,
  AppError,
  IAddPlayerToGroupUseCase,
  IGroupPlayerRepository,
  IVerifyUserPermissionUseCase,
} from '@/domain';

@injectable()
export class AddPlayerToGroupUseCase implements IAddPlayerToGroupUseCase {
  constructor(
    @inject('GroupPlayerRepository')
    private groupPlayerRepository: IGroupPlayerRepository,
    @inject('VerifyUserPermissionUseCase')
    private verifyUserPermissionUseCase: IVerifyUserPermissionUseCase,
  ) {}

  async execute({
    userId,
    playerId,
    groupId,
    paymentRecurrence,
  }: AddPlayerToGroupDTO): Promise<boolean> {
    const userHasPermission = await this.verifyUserPermissionUseCase.execute({
      groupId,
      userId,
    });

    if (!userHasPermission) {
      throw new AppError('Usuário sem permissão para esta operação');
    }

    await this.groupPlayerRepository.create({
      groupId,
      playerId,
      paymentRecurrence,
    });

    return true;
  }
}
