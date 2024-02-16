import { CreateGroupDTO } from '@/domain/dtos';
import { Group } from '@/domain/entities';

export interface ICreateGroupUseCase {
  execute(dto: CreateGroupDTO): Promise<Group>;
}
