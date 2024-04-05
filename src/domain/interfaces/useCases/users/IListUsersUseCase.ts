import { User } from '@/domain/entities';

export interface IListUsersUseCase {
  execute(): Promise<User[]>;
}
