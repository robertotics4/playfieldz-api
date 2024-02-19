import { VerifyUserPermissionDTO } from '@/domain/dtos';

export interface IVerifyUserPermissionUseCase {
  execute(dto: VerifyUserPermissionDTO): Promise<boolean>;
}
