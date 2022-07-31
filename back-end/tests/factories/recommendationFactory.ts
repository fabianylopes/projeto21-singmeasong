import { prisma } from "../../src/database.js";

export function recommendationsFactory() {
    const recommendations = [
        {
            name: 'Helena',
            youtubeLink: 'https://www.youtube.com/watch?v=UCCyoocDxBA',
        },
        {
            name: 'Space Oddity',
            youtubeLink: 'https://www.youtube.com/watch?v=iYYRH4apXDo',
            score: 14,
        },
        {
            name: 'November Rain',
            youtubeLink: 'https://www.youtube.com/watch?v=8SbUC-UaAxE',
            score: 22,
        },
        {
            name: 'Total Eclipse of the Heart',
            youtubeLink: 'https://www.youtube.com/watch?v=Svz-W5w2bPM',
            score: 18,
        },
    ];
    
    return recommendations;
}

export async function createRecommendations() {
    const recommendations = [
        {
            name: 'Helena',
            youtubeLink: 'https://www.youtube.com/watch?v=UCCyoocDxBA',
        },
        {
            name: 'Space Oddity',
            youtubeLink: 'https://www.youtube.com/watch?v=iYYRH4apXDo',
        },
        {
            name: 'November Rain',
            youtubeLink: 'https://www.youtube.com/watch?v=8SbUC-UaAxE',
        },
        {
            name: 'Total Eclipse of the Heart',
            youtubeLink: 'https://www.youtube.com/watch?v=Svz-W5w2bPM',
        },
    ];

    await prisma.recommendation.createMany({
        data: recommendations,
    });

    return recommendations;
}
