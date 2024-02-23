import { AddPlayerToGroupDTO } from '@/domain/dtos';
import { GroupPlayer } from '@/domain/entities';

export interface IAddPlayerToGroupUseCase {
  execute(dto: AddPlayerToGroupDTO): Promise<GroupPlayer>;
}
