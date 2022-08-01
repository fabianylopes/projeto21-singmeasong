/* eslint-disable no-undef */
/// <reference types="cypress" />

import createRecommendation from '../factories/createRecommendation.js';

const URL = 'http://localhost:3000';

describe('recommendations suit test', () => {  
	beforeEach(() => {
        cy.resetDb();
    })
    
	it('should insert recommendation', () => {
		const body = createRecommendation();

		cy.createRecommendationTest(body);
		cy.contains(body.name);

		cy.end();
	});

	it('with empty body should show error window', () => {
		cy.visit(`${URL}`);
        
		cy.get('button').click();

		cy.alertTest();

		cy.end();
        
	});

	it('should upvote when button is clicked', () => {
		const body = createRecommendation();

		cy.createRecommendationTest(body);

		cy.upVote();

		cy.end();
	});

	it('should downvote when button is clicked', () => {
		const body = createRecommendation();

		cy.createRecommendationTest(body);

		cy.downVote();

		cy.end();
	});

	it('should erase if score is below -5"', () => {
		const body = createRecommendation();

		cy.createRecommendationTest(body);

		for(let i = 0; i < 6; i++){
			cy.get('#arrowDown').click();
		}

		cy.contains('No recommendations yet! Create your own :)');

		cy.end();
	});

	it('should get random recommendations', () => {
		cy.seedDb();

		cy.random();

		cy.end();
    });
	

	it('should return top recommendations according to the amount', () => {
		cy.seedDb();

		cy.top();

		cy.end();
	});
});