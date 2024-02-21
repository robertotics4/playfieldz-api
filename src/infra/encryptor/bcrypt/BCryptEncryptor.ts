import * as bcrypt from 'bcrypt';
import { IEncryptor } from '@/domain';

export class BCryptEncryptor implements IEncryptor {
  async hash(data: string | Buffer, saltOrRounds: number): Promise<string> {
    return await bcrypt.hash(data, saltOrRounds);
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
