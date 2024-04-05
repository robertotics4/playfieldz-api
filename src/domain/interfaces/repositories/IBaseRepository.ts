export interface IBaseRepository<T> {
  create(data: Omit<T, '_id'>): Promise<T>;
  list(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  findOne(filters: Partial<T>): Promise<T | null>;
  deleteMany(filter: Partial<T>): Promise<number>;
}
