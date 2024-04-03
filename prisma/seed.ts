import { prisma } from '../src/lib/prisma';

async function seed() {
  await prisma.event.create({
    data: {
      id: 'ee8f0881-078b-48f4-86b0-9602dd5fa1f9',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados pelo código',
      maximumAttendees: 120,
    },
  });
}
seed().then(() => {
  console.log('DataBase seeded');
  prisma.$disconnect();
});
