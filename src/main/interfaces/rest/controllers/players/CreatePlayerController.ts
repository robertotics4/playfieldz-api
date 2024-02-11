import { ICreatePlayerUseCase } from '@/domain';
import { Request, Response } from 'express';

export class CreatePlayerController {
  private createPlayerUseCase: ICreatePlayerUseCase;

  constructor(createPlayerUseCase: ICreatePlayerUseCase) {
    this.handle = this.handle.bind(this);
    this.createPlayerUseCase = createPlayerUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.createPlayerUseCase.execute(request.body);

    return response.status(201).json(result);
  }
}
