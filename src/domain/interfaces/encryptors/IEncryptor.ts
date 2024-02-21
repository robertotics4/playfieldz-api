export interface IEncryptor {
  hash(data: string | Buffer, saltOrRounds: number): Promise<string>;
  compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
