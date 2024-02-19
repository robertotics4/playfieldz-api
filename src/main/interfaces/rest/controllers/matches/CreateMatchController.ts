import { container } from 'tsyringe';
import { CreateMatchUseCase } from '@/application';
import { Request, Response } from 'express';

export class CreateMatchController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createMatchUseCase = container.resolve(CreateMatchUseCase);

    const result = await createMatchUseCase.execute(request.body);

    return response.status(201).json(result);
  }
}
