import { inject, injectable } from 'tsyringe';
import { IListUsersUseCase, IUserRepository, User } from '@/domain';

@injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.list();
  }
}
