import { prisma } from "../database.js";

async function truncate() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}
  
async function seed() {
    const recommendations = [
        {
          name: 'Helena',
          youtubeLink: 'https://www.youtube.com/watch?v=UCCyoocDxBA',
          score: 110,
        },
        {
          name: 'Space Oddity',
          youtubeLink: 'https://www.youtube.com/watch?v=iYYRH4apXDo',
          score: 102,
        },
        {
          name: 'November Rain',
          youtubeLink: 'https://www.youtube.com/watch?v=8SbUC-UaAxE',
          score: 120,
        },
        {
          name: 'Total Eclipse of the Heart',
          youtubeLink: 'https://www.youtube.com/watch?v=Svz-W5w2bPM',
          score: 108,
        },
    ];

    return await prisma.recommendation.createMany({ data: recommendations });
}

export const e2eTestsRepository = {
    truncate,
    seed,
};
  