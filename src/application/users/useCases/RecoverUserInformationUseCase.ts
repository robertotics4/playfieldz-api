import { inject, injectable } from 'tsyringe';
import {
  AppError,
  IRecoverUserInformationUseCase,
  IUserRepository,
  UserInformation,
} from '@/domain';

@injectable()
export class RecoverUserInformationUseCase
  implements IRecoverUserInformationUseCase
{
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<UserInformation> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    // eslint-disable-next-line
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
