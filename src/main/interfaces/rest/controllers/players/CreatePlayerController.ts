import { CreatePlayerUseCase } from '@/application';
import { ICreatePlayerUseCase } from '@/domain';
import { PlayerRepositoryInMemory } from '@/infra';
import { Request, Response } from 'express';

export class CreatePlayerController {
  private createPlayerUseCase?: ICreatePlayerUseCase;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    this.generateUseCase();

    const result = await this.createPlayerUseCase?.execute(request.body);

    return response.status(201).json(result);
  }

  private generateUseCase() {
    const playerRepository = new PlayerRepositoryInMemory();
    this.createPlayerUseCase = new CreatePlayerUseCase(playerRepository);
  }
}
