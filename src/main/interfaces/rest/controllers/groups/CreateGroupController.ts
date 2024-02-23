import { CreateGroupUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const createGroupUseCase = container.resolve(CreateGroupUseCase);

    const result = await createGroupUseCase.execute({
      ...request.body,
      userId: id,
    });

    return response.status(201).json(result);
  }
}
