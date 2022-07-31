import supertest from 'supertest';

import { prisma } from '../../src/database.js';
import app from '../../src/app.js';
import { recommendationsFactory, createRecommendations } from '../factories/recommendationFactory.js';

const agent = supertest(app);

describe("POST recommendations tests", () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
    });
  
    it('should create a recommendation and return 201', async () => {   
        const body = recommendationsFactory();

        const response = await agent.post('/recommendations').send(body[0]);
        expect(response.status).toEqual(201);
    });

    it("given an empty body should return 422", async () => {
        const body = {};
    
        const response = await supertest(app).post("/recommendations").send(body);
        expect(response.status).toEqual(422);
    });

    it('should persist the upvote and return 200', async () => {
        const body = recommendationsFactory();

        const recommendation = await prisma.recommendation.create({
            data: { ...body[0] },
        });

        const response = await agent.post(`/recommendations/${recommendation.id}/upvote`);

        const updatedScore = await prisma.recommendation.findUnique({
            where: { name: recommendation.name }
        })

        expect(response.status).toEqual(200);
        expect(recommendation.score + 1).toEqual(updatedScore.score);
    });

    it('should persist the downvote and return 200', async () => {
        const body = recommendationsFactory();

        const recommendation = await prisma.recommendation.create({
            data: { ...body[0] },
        });

        const response = await agent.post(`/recommendations/${recommendation.id}/downvote`);

        const updatedScore = await prisma.recommendation.findUnique({
            where: { name: recommendation.name }
        })

        expect(response.status).toEqual(200);
        expect(recommendation.score - 1).toEqual(updatedScore.score);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});

describe("GET recommendations tests", () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
    });
  
    it('should get recommendations and return 200', async () => {  
        await createRecommendations();

        const response = await agent.get('/recommendations');
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
    });

    it('should get recommendations by id and return 200', async () => {   
        const body = recommendationsFactory();

        const recommendation = await prisma.recommendation.create({
            data: { ...body[0] }
        })

        const response = await agent.get(`/recommendations/${recommendation.id}`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(recommendation);
    });

    it('should get random recommendations and return 200', async () => {   
        await createRecommendations();

        const response = await agent.get('/recommendations/random');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('youtubeLink');
        expect(response.body).toHaveProperty('score');
    });
    
    it('should return 404 if there is no song registered', async () => {   
        const response = await agent.get('/recommendations/random');
        expect(response.status).toEqual(404);
    });

    it('should return 200 given a set amount musics', async () => {   
        await createRecommendations();
        const amount = 4;

        const response = await agent.get(`/recommendations/top/${amount}`);     
        expect(response.body.length).toBeLessThanOrEqual(amount);
    });
        
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
