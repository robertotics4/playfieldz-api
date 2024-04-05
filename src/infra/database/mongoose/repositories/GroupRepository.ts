import { injectable } from 'tsyringe';
import { Group, IGroupRepository } from '@/domain';
import { BaseRepository } from './BaseRepository'; // Importe a classe BaseRepository aqui
import { SingletonConnection } from '../connections';
import { GroupSchema } from '../schemas';

@injectable()
export class GroupRepository
  extends BaseRepository<Group>
  implements IGroupRepository
{
  constructor() {
    const mongooseInstance = SingletonConnection.getInstance().getConnection();
    const groupModel = mongooseInstance.model<Group>('Group', GroupSchema);
    super(groupModel);
  }
}
