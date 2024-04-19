import { container } from 'tsyringe';
import { FindMatchesUseCase } from '@/application';
import { Request, Response } from 'express';

export class FindMatchesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findMatchesUseCase = container.resolve(FindMatchesUseCase);

    const result = await findMatchesUseCase.execute(request.query);

    return response.json(result);
  }
}
