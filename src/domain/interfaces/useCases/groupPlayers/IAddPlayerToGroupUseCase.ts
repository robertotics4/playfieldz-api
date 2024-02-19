import { AddPlayerToGroupDTO } from '@/domain/dtos';

export interface IAddPlayerToGroupUseCase {
  execute(dto: AddPlayerToGroupDTO): Promise<boolean>;
}
