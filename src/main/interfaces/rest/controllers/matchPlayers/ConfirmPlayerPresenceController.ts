import { ConfirmPlayerPresenceUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ConfirmPlayerPresenceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user } = request;
    const { playerId } = request.body;

    const confirmPlayerPresenceUseCase = container.resolve(
      ConfirmPlayerPresenceUseCase,
    );

    await confirmPlayerPresenceUseCase.execute({
      matchId: id,
      playerId,
      userRoles: user.roles,
    });

    return response.status(204).send();
  }
}
