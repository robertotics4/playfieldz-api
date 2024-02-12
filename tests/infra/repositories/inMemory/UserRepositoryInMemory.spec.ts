import { User, UserPermission } from '@/domain';
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository';
import { UserRepositoryInMemory } from '@/infra';

describe('UserRepositoryInMemory', () => {
  let sut: IUserRepository;
  let userData: Omit<User, 'id'>;

  beforeAll(() => {
    userData = {
      phone: '5598986545555',
      password: 'any_user_password',
      roles: [{ groupId: 'any_group_id', permission: UserPermission.PLAYER }],
    };
  });

  beforeEach(() => {
    sut = new UserRepositoryInMemory();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createdUser = await sut.create(userData);

      expect(createdUser).toBeInstanceOf(User);
      expect(createdUser.id).toBeTruthy();
      expect(createdUser.phone).toEqual(userData.phone);
      expect(createdUser.password).toEqual(userData.password);
      expect(createdUser.roles).toEqual(userData.roles);
    });
  });

  describe('list', () => {
    it('should return an empty array if no users exist', async () => {
      const users = await sut.list();

      expect(users).toEqual([]);
    });

    it('should return an array of users if users exist', async () => {
      await sut.create(userData);

      const users = await sut.list();

      expect(users.length).toBe(1);
      expect(users[0]).toBeInstanceOf(User);
      expect(users[0].phone).toEqual(userData.phone);
      expect(users[0].password).toEqual(userData.password);
    });
  });

  describe('update', () => {
    it('should return null if user does not exist', async () => {
      const updatedUser = await sut.update('nonexistent-id', {
        phone: 'updated_phone',
      });

      expect(updatedUser).toBeNull();
    });

    it('should update user data', async () => {
      const createdUser = await sut.create(userData);

      const updatedUserData = {
        phone: 'updated_phone',
        password: 'updated_password',
      };

      const updatedUser = await sut.update(createdUser.id, updatedUserData);

      expect(updatedUser).toEqual(expect.objectContaining(updatedUserData));
    });
  });

  describe('delete', () => {
    it('should return false if user does not exist', async () => {
      const result = await sut.delete('nonexistent-id');

      expect(result).toBe(false);
    });

    it('should delete user if exists', async () => {
      const createdUser = await sut.create(userData);

      const result = await sut.delete(createdUser.id);

      const users = await sut.list();

      expect(result).toBe(true);
      expect(users).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return null if no user matches the given filters', async () => {
      const foundUser = await sut.findOne({ phone: 'inexistent_phone' });

      expect(foundUser).toBeNull();
    });

    it('should return the first user that matches the given filters', async () => {
      await sut.create(userData);

      const foundUser = await sut.findOne({ phone: userData.phone });

      expect(foundUser).toBeInstanceOf(User);
      expect(foundUser?.phone).toEqual(userData.phone);
    });
  });
});
