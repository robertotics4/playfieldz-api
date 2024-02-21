import { hash } from 'bcrypt';
import { IEncryptor } from '@/domain';

export class BCryptEncryptor implements IEncryptor {
  async hash(data: string | Buffer, saltOrRounds: number): Promise<string> {
    return await hash(data, saltOrRounds);
  }
}
