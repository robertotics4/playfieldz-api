import { FindGroupsUseCase } from '@/application';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FindGroupsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findGroupsUseCase = container.resolve(FindGroupsUseCase);

    const result = await findGroupsUseCase.execute(request.query);

    return response.status(200).json(result);
  }
}
