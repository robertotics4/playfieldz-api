import { UpdatePlayerPresenceUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdatePlayerPresenceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user } = request;
    const { value } = request.body;

    const updatePlayerPresenceUseCase = container.resolve(
      UpdatePlayerPresenceUseCase,
    );

    await updatePlayerPresenceUseCase.execute({
      matchId: id,
      userId: user.id,
      value,
    });

    return response.status(204).send();
  }
}
