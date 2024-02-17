import { IMapper, Player, PlayerPosition, User } from '@/domain';
import { Player as PlayerModel, User as UserModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PlayerMapper implements IMapper<PlayerModel, Player> {
  constructor(
    @inject('UserMapper') private userMapper: IMapper<UserModel, User>,
  ) {}

  convert(databaseModel: {
    id: string;
    name: string;
    nickname: string;
    age: number;
    position: string;
    score: number;
    userId: string;
    groupsId: string[];
    createdAt: Date;
    updatedAt: Date;
    user: UserModel;
  }): Player {
    const { user, ...playerData } = databaseModel;

    const player: Player = {
      ...playerData,
      position: databaseModel.position as PlayerPosition,
    };

    const userWithoutPassword = {
      ...this.userMapper.convert(databaseModel.user),
      password: undefined,
    };

    player.user = userWithoutPassword;

    return player;
  }
}
