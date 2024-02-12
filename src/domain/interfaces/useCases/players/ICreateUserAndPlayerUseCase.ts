import { CreateUserAndPlayerDTO } from '@/domain/dtos';
import { Player, User } from '@/domain/entities';

export namespace CreateUserAndPlayer {
  export type Output = {
    user: Omit<User, 'password'>;
    player: Player;
  };
}

export interface ICreateUserAndPlayerUseCase {
  execute(dto: CreateUserAndPlayerDTO): Promise<CreateUserAndPlayer.Output>;
}
