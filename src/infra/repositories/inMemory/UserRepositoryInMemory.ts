import { randomUUID } from 'node:crypto';
import { User } from '@/domain';
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  private readonly users: User[] = [];

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = new User({
      ...data,
      id: randomUUID(),
    });

    this.users.push(newUser);

    return newUser;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async update(id: string, data: Omit<User, 'id'>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser = { ...this.users[userIndex], ...data };
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
