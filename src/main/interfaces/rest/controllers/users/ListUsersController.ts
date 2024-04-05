import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from '@/application';

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const result = await listUsersUseCase.execute();

    return response.json(result);
  }
}
