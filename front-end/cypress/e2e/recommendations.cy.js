/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('recommendations suit test', () => {
    it('should insert recommendation', () => {

        const body = {
            name: faker.music.songName(),
            url: 'https://www.youtube.com/watch?v=UCCyoocDxBA'
        }
        
        cy.visit('http://localhost:3000/');
        cy.get('input[placeholder="Name"]').type(body.name);
        cy.get('input[placeholder="https://youtu.be/..."]').type(body.url);

        cy.intercept('POST', 'http://localhost:3000/recommendations').as('insertRecommandation')
        cy.get("button").click();
        cy.wait("@insertRecommandation");
        cy.contains(body.name);
    });
});