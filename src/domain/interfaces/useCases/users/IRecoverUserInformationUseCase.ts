import { User } from '@/domain/entities';

export type UserInformation = Omit<User, 'password'>;

export interface IRecoverUserInformationUseCase {
  execute(userId: string): Promise<UserInformation>;
}
