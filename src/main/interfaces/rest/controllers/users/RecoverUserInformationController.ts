import { RecoverUserInformationUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RecoverUserInformationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const recoverUserInformationUseCase = container.resolve(
      RecoverUserInformationUseCase,
    );

    const userInformation = await recoverUserInformationUseCase.execute(
      request.user.id,
    );

    return response.status(200).json(userInformation);
  }
}
