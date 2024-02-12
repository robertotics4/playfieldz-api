import { CreateUserDTO, ICreateUserUseCase, User } from '@/domain';
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    return await this.userRepository.create(dto);
  }
}
