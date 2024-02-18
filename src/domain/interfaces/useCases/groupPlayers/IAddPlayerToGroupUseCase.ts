import { AddPlayerToGroupDTO } from '@/domain/dtos';

export interface IAddPlayerToGroupUseCase {
  execute({ userId, playerId, groupId }: AddPlayerToGroupDTO): Promise<boolean>;
}
