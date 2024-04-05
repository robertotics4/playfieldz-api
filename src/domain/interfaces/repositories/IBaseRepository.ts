import { Types } from 'mongoose';

export interface IBaseRepository<T> {
  create(data: Omit<T, '_id'>): Promise<T>;
  list(): Promise<T[]>;
  update(id: string | Types.ObjectId, data: Partial<T>): Promise<T | null>;
  delete(id: string | Types.ObjectId): Promise<boolean>;
  findOne(filters: Partial<T>): Promise<T | null>;
  findById(id: string | Types.ObjectId): Promise<T | null>;
  deleteMany(filter: Partial<T>): Promise<number>;
}
