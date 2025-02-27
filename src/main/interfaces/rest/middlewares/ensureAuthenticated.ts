import 'express-async-errors';
import jwt from 'jsonwebtoken';
import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain';
import { UserRepository } from '@/infra';
import { Types } from 'mongoose';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token vazio', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = jwt.verify(
      token,
      process.env.JWT_HASH_MD5 as string,
    ) as IPayload;

    const usersRepository = container.resolve(UserRepository);

    const user = await usersRepository.findOne({
      _id: userId,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }

    request.user = { id: userId, roles: [...user.roles] };

    next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}
