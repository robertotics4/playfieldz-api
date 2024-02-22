import {
  AppError,
  ConfirmPlayerPresenceDTO,
  IConfirmPlayerPresenceUseCase,
  IMatchPlayerRepository,
  IMatchRepository,
  UserPermission,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ConfirmPlayerPresenceUseCase
  implements IConfirmPlayerPresenceUseCase
{
  constructor(
    @inject('MatchRepository') private matchRepository: IMatchRepository,
    @inject('MatchPlayerRepository')
    private matchPlayerRepository: IMatchPlayerRepository,
  ) {}

  async execute({
    matchId,
    playerId,
    userRoles,
  }: ConfirmPlayerPresenceDTO): Promise<boolean> {
    const match = await this.matchRepository.findOne({ id: matchId });

    // if (!match) {
    //   throw new AppError('Partida não encontrada');
    // }

    // if (!userRoles || !userRoles.length) {
    //   throw new AppError('Usuário sem permissão');
    // }

    // const havePlayerPermission = userRoles.find(
    //   r =>
    //     r.groupId === match.groupId && r.permission === UserPermission.PLAYER,
    // );

    // if (!havePlayerPermission) {
    //   throw new AppError('Usuário sem permissão');
    // }

    // await this.matchPlayerRepository.create({
    //   matchId,
    //   playerId,
    // });

    return true;
  }
}
