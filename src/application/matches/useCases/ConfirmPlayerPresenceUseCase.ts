import {
  AppError,
  ConfirmPlayerPresenceDTO,
  IConfirmPlayerPresenceUseCase,
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
  ) {}

  async execute({
    userId,
    matchId,
  }: ConfirmPlayerPresenceDTO): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw new AppError('Partida não encontrada');
    }

    const userPermission = user.roles.find(r => {
      console.log({
        roleId: r.groupId,
        matchGroupId: match.group._id,
        isEqual: r.groupId.equals(match.group._id),
      });
      return (
        r.groupId.equals(match.group._id) &&
        r.permission === UserPermission.PLAYER
      );
    });

    if (!userPermission) {
      throw new AppError('Usuário não é um jogador do grupo');
    }

    if (!user.player) {
      throw new AppError('Usuário não possui um cadastro como jogador');
    }

    const player = await this.playerRepository.findById(user.player._id);

    if (!player) {
      throw new AppError('Jogador não encontrado');
    }

    const playerAlreadyExists = match.matchPlayers.find(
      matchPlayer => matchPlayer._id === player._id,
    );

    if (playerAlreadyExists) {
      throw new AppError('O jogador já confirmou presença');
    }

    await this.matchRepository.update(match._id, {
      matchPlayers: [...match.matchPlayers, player],
    });

    return true;
  }
}
