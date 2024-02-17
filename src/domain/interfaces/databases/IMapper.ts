export interface IMapper<T, U> {
  convert(databaseModel: T): U;
}
