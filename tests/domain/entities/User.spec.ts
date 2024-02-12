import { User, UserPermission } from '@/domain';

describe('User', () => {
  const userData: User = {
    id: '1',
    password: 'any_password',
    phone: '123456789',
    roles: [{ groupId: 'any_group_id', permission: UserPermission.PLAYER }],
  };

  it('should create an user instance', () => {
    const user = new User(userData);
    expect(user).toBeDefined();
    expect(user instanceof User).toBeTruthy();
  });

  it('should properly initialize player properties', () => {
    const user = new User(userData);
    expect(user.id).toEqual(userData.id);
    expect(user.password).toEqual(userData.password);
    expect(user.phone).toEqual(userData.phone);
    expect(user.roles).toEqual(userData.roles);
  });
});
