import 'reflect-metadata';
import '../../../../main/config/module-alias';
import mongoose from 'mongoose';
import { container } from 'tsyringe';
import { Group, User, UserPermission } from '@/domain';
import { GroupRepository, UserRepository } from '../repositories';

const userRepository = container.resolve(UserRepository);
const groupRepository = container.resolve(GroupRepository);

async function cleanAll() {
  await userRepository.deleteMany({});
  await groupRepository.deleteMany({});
}

function getRootHashMd5() {
  const rootHashMd5 = process.env.JWT_HASH_MD5;

  if (!rootHashMd5) {
    throw new Error('Você precisa configurar a env JWT_HASH_MD5');
  }

  return rootHashMd5;
}

async function createRootUser(): Promise<User> {
  const existentUser = await userRepository.findOne({ phone: '777' });

  if (existentUser) return existentUser;

  return await userRepository.create({
    phone: 'root@777',
    password: 'root@777',
    roles: [],
  });
}

async function createRootGroup(rootUser: User, hash: string): Promise<Group> {
  const existentGroup = await groupRepository.findOne({ name: hash });

  if (!existentGroup) {
    const newGroup = await groupRepository.create({
      name: hash,
      createdBy: rootUser,
      playerSubscriptions: [],
    });

    return newGroup;
  }

  return existentGroup;
}

async function addRolestoRootUser(user: User, group: Group) {
  await userRepository.update(user._id, {
    roles: [{ groupId: group._id, permission: UserPermission.ROOT }],
  });
}

async function main() {
  try {
    await cleanAll();
    const hash = getRootHashMd5();
    const rootUser = await createRootUser();
    const rootGroup = await createRootGroup(rootUser, hash);
    await addRolestoRootUser(rootUser, rootGroup);
    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
