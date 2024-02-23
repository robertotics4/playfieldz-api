import {
  AppError,
  ConfirmPlayerPresenceDTO,
  IConfirmPlayerPresenceUseCase,
  IMatchPlayerRepository,
  IMatchRepository,
  IPlayerRepository,
  IUserRepository,
  UserPermission,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ConfirmPlayerPresenceUseCase
  implements IConfirmPlayerPresenceUseCase
{
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('MatchRepository') private matchRepository: IMatchRepository,
    @inject('PlayerRepository') private playerRepository: IPlayerRepository,
    @inject('MatchPlayerRepository')
    private matchPlayerRepository: IMatchPlayerRepository,
  ) {}

  async execute({
    userId,
    matchId,
  }: ConfirmPlayerPresenceDTO): Promise<boolean> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const match = await this.matchRepository.findOne({ id: matchId });

    if (!match) {
      throw new AppError('Partida não encontrada');
    }

    const userPermission = user.roles.find(
      r =>
        r.groupId === match.groupId && r.permission === UserPermission.PLAYER,
    );

    if (!userPermission) {
      throw new AppError('Usuário sem permissão');
    }

    const player = await this.playerRepository.findOne({ userId: user.id });

    if (!player) {
      throw new AppError('Jogador não encontrado');
    }

    // validar se o jogador já confirmou presença

    await this.matchPlayerRepository.create({
      matchId,
      playerId: player.id,
    });

    return true;
  }
}
