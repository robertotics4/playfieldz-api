import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { container } from 'tsyringe';
import '../../../../main/config/module-alias';
import {
  Group,
  Player,
  PlayerPaymentRecurrence,
  PlayerPosition,
} from '@/domain';
import {
  AddPlayerToGroupUseCase,
  CreateGroupUseCase,
  CreateMatchUseCase,
  CreateUserAndPlayerUseCase,
  UpdatePlayerPresenceUseCase,
  UpdateUserPermissionsUseCase,
  VerifyUserPermissionUseCase,
} from '@/application';
import { BCryptEncryptor } from '@/infra/encryptor';
import mongoose from 'mongoose';
import {
  GroupRepository,
  MatchRepository,
  PlayerRepository,
  UserRepository,
} from '../repositories';

const userRepository = container.resolve(UserRepository);
const playerRepository = container.resolve(PlayerRepository);
const groupRepository = container.resolve(GroupRepository);
const matchRepository = container.resolve(MatchRepository);
const encryptor = container.resolve(BCryptEncryptor);

const createUserAndPlayerUseCase = new CreateUserAndPlayerUseCase(
  userRepository,
  playerRepository,
  encryptor,
);
const createGroupUseCase = new CreateGroupUseCase(
  userRepository,
  groupRepository,
);
const verifyUserPermissionUseCase = new VerifyUserPermissionUseCase(
  groupRepository,
  userRepository,
);
const updateUserPermissionsUseCase = new UpdateUserPermissionsUseCase(
  verifyUserPermissionUseCase,
  userRepository,
);
const addPlayerToGroupUseCase = new AddPlayerToGroupUseCase(
  playerRepository,
  updateUserPermissionsUseCase,
  groupRepository,
);
const createMatchUseCase = new CreateMatchUseCase(
  matchRepository,
  groupRepository,
  verifyUserPermissionUseCase,
);
const updatePlayerPresenceUseCase = new UpdatePlayerPresenceUseCase(
  userRepository,
  matchRepository,
  playerRepository,
);

const fakePassword = '12345678';

function getRandomPosition(): PlayerPosition {
  const positions = Object.values(PlayerPosition);
  const randomIndex = Math.floor(Math.random() * positions.length);
  return positions[randomIndex];
}

async function createMyPlayer(): Promise<Player> {
  return await createUserAndPlayerUseCase.execute({
    user: {
      name: 'Luis Roberto',
      password: fakePassword,
      phone: '98982045774',
      roles: [],
    },
    player: {
      nickname: 'Caneta',
      age: 32,
      position: PlayerPosition.DM,
    },
  });
}

async function createFakePlayers(quantity: number): Promise<Player[]> {
  const players: Player[] = [];

  for (let count = 0; count < quantity; count += 1) {
    const firstName = faker.person.firstName('male');
    const dto = {
      user: {
        name: faker.person.fullName({ firstName }),
        password: fakePassword,
        phone: faker.phone.number(),
        roles: [],
      },
      player: {
        nickname: firstName,
        age: faker.number.int({ min: 18, max: 50 }),
        position: getRandomPosition(),
      },
    };

    const player = await createUserAndPlayerUseCase.execute(dto);
    players.push(player);
  }

  return players;
}

async function createFakeGroups(userId: string): Promise<Group[]> {
  const firstGroup = await createGroupUseCase.execute({
    name: 'FRC Resenha Futebol Clube',
    userId,
    description:
      'Grupo de futebol fundado há mais de 10 anos com jogos localizados na arena do Grêmio no vinhais',
  });
  const secondGroup = await createGroupUseCase.execute({
    name: 'Pelada da PF',
    userId,
    description:
      'Grupo de futebol fundado há mais de 10 anos com jogos localizados na Associação da Polícia Federal no Turu',
  });

  return [firstGroup, secondGroup];
}

async function createFakeMatch(
  adminId: string,
  groupId: string,
  maxPlayerLimit: number,
  playersPerTeam: number,
) {
  const schedulling = new Date();
  schedulling.setDate(
    schedulling.getDate() + faker.number.int({ min: 1, max: 5 }),
  );

  return await createMatchUseCase.execute({
    adminId,
    groupId,
    maxPlayerLimit,
    playersPerTeam,
    schedulling,
  });
}

async function main() {
  try {
    const myPlayer = await createMyPlayer();
    console.log(`User created successfuly!`);

    const groups = await createFakeGroups(myPlayer.userId);
    Promise.all([
      addPlayerToGroupUseCase.execute({
        adminId: myPlayer.userId,
        groupId: groups[0]._id.toString(),
        paymentRecurrence: PlayerPaymentRecurrence.MONTHLY,
        playerId: myPlayer._id.toString(),
      }),
      addPlayerToGroupUseCase.execute({
        adminId: myPlayer.userId,
        groupId: groups[1]._id.toString(),
        paymentRecurrence: PlayerPaymentRecurrence.MONTHLY,
        playerId: myPlayer._id.toString(),
      }),
    ]);
    console.log(`Groups created sucessfuly!`);

    const maxPlayerLimit = 30;
    const fakePlayers = await createFakePlayers(maxPlayerLimit);
    console.log(`${maxPlayerLimit} fake players created successfuly!`);

    const addPromises = [];
    for (let counter = 0; counter < maxPlayerLimit; counter += 1) {
      const promise = addPlayerToGroupUseCase.execute({
        adminId: myPlayer.userId,
        groupId: groups[0]._id.toString(),
        paymentRecurrence:
          counter % 2 === 0
            ? PlayerPaymentRecurrence.DAILY
            : PlayerPaymentRecurrence.MONTHLY,
        playerId: fakePlayers[counter]._id.toString(),
      });

      addPromises.push(promise);
    }

    for (let counter = 0; counter < maxPlayerLimit; counter += 1) {
      const promise = addPlayerToGroupUseCase.execute({
        adminId: myPlayer.userId,
        groupId: groups[1]._id.toString(),
        paymentRecurrence:
          counter % 2 === 0
            ? PlayerPaymentRecurrence.DAILY
            : PlayerPaymentRecurrence.MONTHLY,
        playerId: fakePlayers[counter]._id.toString(),
      });

      addPromises.push(promise);
    }

    await Promise.all(addPromises);
    console.log(`${maxPlayerLimit} players added to group ${groups[0].name}`);
    console.log(`${maxPlayerLimit} players added to group ${groups[1].name}`);

    const firstMatch = await createFakeMatch(
      myPlayer.userId,
      groups[0]._id.toString(),
      maxPlayerLimit,
      6,
    );
    const secondMatch = await createFakeMatch(
      myPlayer.userId,
      groups[1]._id.toString(),
      maxPlayerLimit,
      6,
    );

    const confirmPromises = [];
    for (let count = 0; count < maxPlayerLimit; count += 1) {
      if (count % 2 === 0) {
        const promise = updatePlayerPresenceUseCase.execute({
          userId: fakePlayers[count].userId.toString(),
          matchId: firstMatch._id.toString(),
          value: true,
        });
        confirmPromises.push(promise);
      }
    }
    for (let count = 0; count < maxPlayerLimit; count += 1) {
      if (count % 2 === 0) {
        const promise = updatePlayerPresenceUseCase.execute({
          userId: fakePlayers[count].userId.toString(),
          matchId: secondMatch._id.toString(),
          value: true,
        });
        confirmPromises.push(promise);
      }
    }
    await Promise.all(confirmPromises);
    console.log(
      `${maxPlayerLimit} players confirmed to match ${firstMatch._id}`,
    );
    console.log(
      `${maxPlayerLimit} players confirmed to match ${secondMatch._id}`,
    );

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
