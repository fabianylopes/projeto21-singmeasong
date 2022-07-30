/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

const URL = 'http://localhost:3000';

describe('recommendations suit test', () => {  
    beforeEach(() => {
        cy.resetDb();
    })
    
    it('should insert recommendation', () => {
        const body = {
            name: faker.music.songName(),
            url: 'https://www.youtube.com/watch?v=UCCyoocDxBA'
        }
        
        cy.visit(`${URL}`);
        cy.get('#name').type(body.name);
        cy.get('#url').type(body.url);

        cy.intercept("POST", "/recommendations").as('insertRecommandation')
        cy.get("#button").click();
        cy.wait("@insertRecommandation");

        cy.contains(body.name).end();
    });

    it('with empry body should show error window', () => {
        const body = {};

        cy.visit(`${URL}`);
        cy.get("#button").click();
        
    });

    /* it('should upvote', () => {

    });

    it('should downvote', () => {
        
    }); */
});