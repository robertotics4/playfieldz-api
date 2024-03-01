import 'reflect-metadata';
import 'express-async-errors';
import '../../config/module-alias';
import '@/infra/container';

import { env } from '@/main/config/env';

import { app } from './app';

app.listen(env.port, () =>
  console.log(
    `Server running at http://localhost:${env.port}\nDocumentation: http://localhost:${env.port}/${env.docsPathName}`,
  ),
);
