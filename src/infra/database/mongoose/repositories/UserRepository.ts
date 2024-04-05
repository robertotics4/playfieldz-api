import { injectable } from 'tsyringe';
import { IUserRepository, User } from '@/domain';
import { BaseRepository } from './BaseRepository';
import { SingletonConnection } from '../connections';
import { UserSchema } from '../schemas';

@injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    const mongooseInstance = SingletonConnection.getInstance().getConnection();
    const userModel = mongooseInstance.model<User>('User', UserSchema);
    super(userModel);
  }
}
