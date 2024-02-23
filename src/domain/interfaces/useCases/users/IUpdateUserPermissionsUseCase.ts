import { UpdateUserPermissionsDTO } from '@/domain/dtos';
import { User } from '@/domain/entities';

export interface IUpdateUserPermissionsUseCase {
  execute(dto: UpdateUserPermissionsDTO): Promise<User>;
}
