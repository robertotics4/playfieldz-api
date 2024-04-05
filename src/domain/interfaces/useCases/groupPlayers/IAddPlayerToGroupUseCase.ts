import { AddPlayerToGroupDTO } from '@/domain/dtos';
import { PlayerSubscription } from '@/domain/entities';

export interface IAddPlayerToGroupUseCase {
  execute(dto: AddPlayerToGroupDTO): Promise<PlayerSubscription>;
}
