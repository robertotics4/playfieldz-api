abstract class GroupProps {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public imageUrl?: string,
  ) {}
}

export class Group extends GroupProps {
  constructor(group: GroupProps) {
    super(group.id, group.name, group.description, group.imageUrl);
  }
}
