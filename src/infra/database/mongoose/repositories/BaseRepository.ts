import { injectable } from 'tsyringe';
import { Model, FilterQuery } from 'mongoose';
import { IBaseRepository } from '@/domain';

@injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Omit<T, '_id'>): Promise<T> {
    const createdDocument = await this.model.create(data);
    return createdDocument.toObject() as T;
  }

  async list(): Promise<T[]> {
    const documents = await this.model.find();
    return documents.map(doc => doc.toObject() as T);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updatedDocument = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDocument ? (updatedDocument.toObject() as T) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }

  async findOne(filters: Partial<T>): Promise<T | null> {
    const document = await this.model.findOne(filters as FilterQuery<T>);
    return document ? (document.toObject() as T) : null;
  }

  async deleteMany(filter: Partial<T>): Promise<number> {
    const result = await this.model.deleteMany(filter as FilterQuery<T>);
    return result.deletedCount ?? 0;
  }
}
