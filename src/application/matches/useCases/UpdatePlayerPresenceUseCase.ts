import {
  AppError,
  IMatchRepository,
  IPlayerRepository,
  IUpdatePlayerPresenceUseCase,
  IUserRepository,
  Match,
  Player,
  UpdatePlayerPresenceDTO,
  UserPermission,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdatePlayerPresenceUseCase
  implements IUpdatePlayerPresenceUseCase
{
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('MatchRepository') private matchRepository: IMatchRepository,
    @inject('PlayerRepository') private playerRepository: IPlayerRepository,
  ) {}

  async execute({
    userId,
    matchId,
    value,
  }: UpdatePlayerPresenceDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw new AppError('Partida não encontrada');
    }

    const userPermission = user.roles.find(r => {
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

    await this.updatePresenceOnMatch(match, player, value);
  }

  private async updatePresenceOnMatch(
    match: Match,
    player: Player,
    value: boolean,
  ) {
    if (value === true) {
      const playerAlreadyExists = match.matchPlayers.find(matchPlayer =>
        matchPlayer._id.equals(player._id),
      );

      if (playerAlreadyExists) {
        throw new AppError('O jogador já confirmou presença');
      }

      await this.matchRepository.update(match._id, {
        matchPlayers: [...match.matchPlayers, player],
      });
    } else {
      const playerExists = match.matchPlayers.find(matchPlayer =>
        matchPlayer._id.equals(player._id),
      );

      if (!playerExists) {
        throw new AppError('O Jogador ainda não confirmou presença');
      }

      const matchPlayersWithoutCurrent = match.matchPlayers.filter(
        matchPlayer => !matchPlayer._id.equals(player._id),
      );

      await this.matchRepository.update(match._id, {
        matchPlayers: matchPlayersWithoutCurrent,
      });
    }
  }
}
