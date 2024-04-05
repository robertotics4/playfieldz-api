import { User } from '@/domain/entities';
import { IBaseRepository } from './IBaseRepository';

export type IUserRepository = IBaseRepository<User>;
