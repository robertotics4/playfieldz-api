export interface IEncryptor {
  hash(data: string | Buffer, saltOrRounds: number): Promise<string>;
}
