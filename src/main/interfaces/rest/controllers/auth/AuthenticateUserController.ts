import { AuthenticateUserUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authInfo = await authenticateUserUseCase.execute(request.body);

    return response.status(200).json(authInfo);
  }
}
