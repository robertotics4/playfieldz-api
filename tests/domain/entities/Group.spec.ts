import { Group } from '@/domain';

describe('Group', () => {
  const groupData: Group = {
    id: 'any_id',
    name: 'any_group_name',
    createdBy: 'any_user_id',
    description: 'any_group_description',
    imageUrl: 'any_image_url',
  };

  it('should create a group instance', () => {
    const group = new Group(groupData);
    expect(group).toBeDefined();
    expect(group instanceof Group).toBeTruthy();
  });

  it('should properly initialize group properties', () => {
    const group = new Group(groupData);
    expect(group.id).toEqual(groupData.id);
    expect(group.name).toEqual(groupData.name);
    expect(group.description).toEqual(groupData.description);
    expect(group.imageUrl).toEqual(groupData.imageUrl);
  });
});
