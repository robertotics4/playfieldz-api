import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPlayersUseCase } from '@/application';

export class ListPlayersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPlayersUseCase = container.resolve(ListPlayersUseCase);

    const result = await listPlayersUseCase.execute();

    return response.json(result);
  }
}
