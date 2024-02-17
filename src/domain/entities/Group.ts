import { User } from './User';

abstract class GroupProps {
  constructor(
    public id: string,
    public name: string,
    public createdBy: string,
    public description?: string,
    public imageUrl?: string,
  ) {}
}

export class Group extends GroupProps {
  constructor(group: GroupProps) {
    super(
      group.id,
      group.name,
      group.createdBy,
      group.description,
      group.imageUrl,
    );
  }

  creator?: User;
}
