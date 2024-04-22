export interface ILoadUsersFromCsvUseCase {
  execute(csvData: Buffer): Promise<void>;
}
