import { injectable } from 'tsyringe';
import { Model, FilterQuery, Types } from 'mongoose';
import { IBaseRepository } from '@/domain';

@injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  private normalizeId(_id: string | Types.ObjectId): Types.ObjectId {
    return typeof _id === 'string'
      ? Types.ObjectId.createFromHexString(_id)
      : _id;
  }

  async create(data: Omit<T, '_id'>): Promise<T> {
    const createdDocument = await this.model.create(data);
    return createdDocument.toObject() as T;
  }

  async list(): Promise<T[]> {
    const documents = await this.model.find();
    return documents.map(doc => doc.toObject() as T);
  }

  async update(
    _id: string | Types.ObjectId,
    data: Partial<T>,
  ): Promise<T | null> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      this.normalizeId(_id),
      data,
      { new: true },
    );
    return updatedDocument ? (updatedDocument.toObject() as T) : null;
  }

  async delete(_id: string | Types.ObjectId): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(this.normalizeId(_id));
    return !!result;
  }

  async findOne(filters: Partial<T>): Promise<T | null> {
    const document = await this.model.findOne(filters as FilterQuery<T>);
    return document ? (document.toObject() as T) : null;
  }

  async findById(id: string | Types.ObjectId): Promise<T | null> {
    const document = await this.model.findById(this.normalizeId(id));
    return document ? (document.toObject() as T) : null;
  }

  async deleteMany(filter: Partial<T>): Promise<number> {
    const result = await this.model.deleteMany(filter as FilterQuery<T>);
    return result.deletedCount ?? 0;
  }
}
