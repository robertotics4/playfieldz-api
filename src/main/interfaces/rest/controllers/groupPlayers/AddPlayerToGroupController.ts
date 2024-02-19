import { AddPlayerToGroupUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AddPlayerToGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: groupId } = request.params;
    const { userId, playerId, paymentRecurrence } = request.body;

    const addPlayerToGroupUseCase = container.resolve(AddPlayerToGroupUseCase);

    await addPlayerToGroupUseCase.execute({
      groupId,
      userId,
      playerId,
      paymentRecurrence,
    });

    return response.status(204).send();
  }
}
