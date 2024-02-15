import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { errors } from 'celebrate';
import { env } from '@/main/config/env';
import swaggerDocs from '@/main/config/swaggerDocs';
import { AppError } from '@/domain';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(errors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err.message);
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

app.use(
  `/${env.docsPathName}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerDocs)),
);

export { app };
