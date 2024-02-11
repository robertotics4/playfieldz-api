import { IListPlayersUseCase } from '@/domain/interfaces/useCases/players/IListPlayersUseCase';
import { Request, Response } from 'express';

export class ListPlayersController {
  private listPlayersUseCase: IListPlayersUseCase;

  constructor(listPlayersUseCase: IListPlayersUseCase) {
    this.handle = this.handle.bind(this);
    this.listPlayersUseCase = listPlayersUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.listPlayersUseCase.execute();

    return response.json(result);
  }
}
