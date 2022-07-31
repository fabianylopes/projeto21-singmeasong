import supertest from 'supertest';

import { prisma } from '../../src/database.js';
import app from '../../src/app.js';
import recommendationsFactory from '../factories/recommendationFactory.js';

const agent = supertest(app);

describe("recommendations tests", () => {
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