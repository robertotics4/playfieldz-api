import { ConfirmPlayerPresenceDTO } from '@/domain/dtos';

export interface IConfirmPlayerPresenceUseCase {
  execute(dto: ConfirmPlayerPresenceDTO): Promise<boolean>;
}
