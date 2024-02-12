import { User } from '@/domain/entities';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  list(): Promise<User[]>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findOne(filters: Partial<User>): Promise<User | null>;
}
