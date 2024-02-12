import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserAndPlayerUseCase } from '@/application';

export class CreateUserAndPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserAndPlayerUseCase = container.resolve(
      CreateUserAndPlayerUseCase,
    );
    const result = await createUserAndPlayerUseCase.execute(request.body);

    return response.status(201).json(result);
  }
}
