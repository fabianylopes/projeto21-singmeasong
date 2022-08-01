import { prisma } from "../database.js";

async function truncate() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}
  
async function seed() {
    const recommendations = [
        {
          name: 'Helena',
          youtubeLink: 'https://www.youtube.com/watch?v=UCCyoocDxBA',
          score: 16,
        },
        {
          name: 'Space Oddity',
          youtubeLink: 'https://www.youtube.com/watch?v=iYYRH4apXDo',
          score: 12,
        },
        {
          name: 'November Rain',
          youtubeLink: 'https://www.youtube.com/watch?v=8SbUC-UaAxE',
          score: 22,
        },
        {
          name: 'Girls Just Want To Have Fun',
          youtubeLink: 'https://www.youtube.com/watch?v=PIb6AZdTr-A',
          score: 18,
        },
    ];

    return await prisma.recommendation.createMany({ data: recommendations });
}

export const e2eTestsRepository = {
    truncate,
    seed,
};
  