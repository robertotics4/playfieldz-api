import '../../config/module-alias';

import { env } from '@/main/config/env';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain';
import { app } from './app';

app.get('/', (request, response) => {
  return response.json({
    appName: 'Playfieldz API',
    version: '1.0.0',
  });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(env.port, () =>
  console.log(
    `Server running at http://localhost:${env.port}\nDocumentation: http://localhost:${env.port}/${env.docsPathName}`,
  ),
);
