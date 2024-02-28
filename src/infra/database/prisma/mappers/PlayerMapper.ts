import { AttributeName, IMapper, Player, PlayerPosition, User } from '@/domain';
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
    userId: string;
    groupsId: string[];
    createdAt: Date;
    updatedAt: Date;
    user: UserModel;
    attributes: { name: string; value: number }[];
  }): Player {
    const { user, attributes, ...playerData } = databaseModel;

    const mappedAttributes = attributes.map(att => ({
      name: att.name as AttributeName,
      value: att.value,
    }));

    const score = this.calculateScore(mappedAttributes);

    const player: Player = {
      ...playerData,
      attributes: mappedAttributes,
      position: databaseModel.position as PlayerPosition,
      score,
    };

    const userWithoutPassword = {
      ...this.userMapper.convert(user),
      password: undefined,
    };

    player.user = userWithoutPassword;

    return player;
  }

  private calculateScore(
    attributes: { name: AttributeName; value: number }[],
  ): number {
    if (attributes.length === 0) {
      return 0;
    }

    const sum = attributes.reduce((acc, curr) => acc + curr.value, 0);
    const average = sum / attributes.length;
    return average;
  }
}
