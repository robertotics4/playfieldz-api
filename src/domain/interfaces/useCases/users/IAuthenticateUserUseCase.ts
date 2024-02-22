import { AuthenticateUserDTO } from '@/domain/dtos';

export type AuthInfo = {
  user: {
    id: string;
    phone: string;
  };
  token: string;
  tokenExpirationInSeconds: number;
};

export interface IAuthenticateUserUseCase {
  execute(dto: AuthenticateUserDTO): Promise<AuthInfo>;
}
