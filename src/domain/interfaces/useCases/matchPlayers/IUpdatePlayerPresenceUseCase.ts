import { UpdatePlayerPresenceDTO } from '@/domain/dtos';

export interface IUpdatePlayerPresenceUseCase {
  execute(dto: UpdatePlayerPresenceDTO): Promise<void>;
}
