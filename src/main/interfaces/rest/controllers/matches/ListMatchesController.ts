import { container } from 'tsyringe';
import { ListMatchesUseCase } from '@/application';
import { Request, Response } from 'express';

export class ListMatchesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMatchesUseCase = container.resolve(ListMatchesUseCase);

    const result = await listMatchesUseCase.execute();

    return response.json(result);
  }
}
