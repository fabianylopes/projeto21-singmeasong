/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

const URL = 'http://localhost:3000';

describe('recommendations suit test', () => {  
    /* beforeEach(() => {
        cy.resetDb();
    }) */
    
   /*  it('should insert recommendation', () => {
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

        cy.contains(body.name).should('be.visible');

        cy.end();
    }); */

    it('with empty body should show error window', () => {
        const body = {};

        cy.insertRecommandation(body);

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Error creating recommendation!').end();
        });
        
    });

    it('should upvote when button is clicked', () => {

        cy.visit(`${URL}`);

        cy.get('#arrowUp').click();


    });

    it('should downvote when button is clicked', () => {
        
        cy.visit(`${URL}`);

        cy.get('#arrowDown').click();

    });
});