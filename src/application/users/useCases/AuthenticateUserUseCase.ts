import {
  AppError,
  AuthInfo,
  AuthenticateUserDTO,
  IAuthenticateUserUseCase,
  IEncryptor,
  IJsonWebToken,
  IUserRepository,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  private readonly AUTHENTICATION_ERROR_MESSAGE = 'Usuário ou senha inválidos';

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('Encryptor') private encryptor: IEncryptor,
    @inject('JsonWebToken') private jsonWebToken: IJsonWebToken,
  ) {}

  async execute(dto: AuthenticateUserDTO): Promise<AuthInfo> {
    const user = await this.userRepository.findOne({ phone: dto.phone });

    if (!user) {
      throw new AppError(this.AUTHENTICATION_ERROR_MESSAGE, 401);
    }

    const passwordMatch = await this.encryptor.compare(
      dto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError(this.AUTHENTICATION_ERROR_MESSAGE, 401);
    }

    const tokenExpirationInSeconds =
      this.jsonWebToken.getTokenExpirationInSeconds();
    const token = this.jsonWebToken.sign(
      {},
      process.env.JWT_HASH_MD5 as string,
      {
        subject: user._id,
        expiresIn: tokenExpirationInSeconds,
      },
    );

    return {
      user: {
        id: user._id,
        phone: user.phone,
      },
      token,
      tokenExpirationInSeconds,
    };
  }
}
