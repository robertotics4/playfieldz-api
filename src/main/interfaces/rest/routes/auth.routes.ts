import { Router } from 'express';
import { AuthenticateUserController } from '../controllers';

const authRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authRouter.post('/sign-in', authenticateUserController.handle);

export { authRouter };
