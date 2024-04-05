export interface IDatabaseConnection<C, M> {
  connect(uri: string, options?: C): Promise<void>;
  disconnect(): void;
  getConnection(): M;
}
