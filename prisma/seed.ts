import { Group, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rootHashMd5 = '885470c9422ed5014a300508bdd34a52';

async function cleanAll() {
  await prisma.group.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.player.deleteMany({});
}

async function createRootGroup(): Promise<Group> {
  let existentGroup = await prisma.group.findFirst({
    where: { name: rootHashMd5 },
  });

  if (!existentGroup) {
    existentGroup = await prisma.group.create({
      data: {
        name: rootHashMd5,
      },
    });
  }

  return existentGroup;
}

async function createRootUser(rootGroupId: string) {
  const existentUser = await prisma.user.findFirst({ where: { phone: '777' } });

  if (!existentUser) {
    await prisma.user.create({
      data: {
        phone: 'root@777',
        password: 'root@777',
        roles: [{ groupId: rootGroupId, permission: 'Root' }],
      },
    });
  }
}

async function main() {
  await cleanAll();
  const rootGroup = await createRootGroup();
  await createRootUser(rootGroup.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
