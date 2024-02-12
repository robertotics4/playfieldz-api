import { CreateUserDTO } from '@/domain/dtos';
import { User } from '@/domain/entities';

export interface ICreateUserUseCase {
  execute(dto: CreateUserDTO): Promise<User>;
}
