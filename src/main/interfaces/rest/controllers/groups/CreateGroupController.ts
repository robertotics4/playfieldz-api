import { CreateGroupUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createGroupUseCase = container.resolve(CreateGroupUseCase);

    const result = await createGroupUseCase.execute(request.body);

    return response.status(201).json(result);
  }
}
