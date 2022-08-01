/* eslint-disable no-undef */
Cypress.Commands.add("resetDb", () => {
    cy.request("POST", "http://localhost:5000/recommendations/reset", { });
});

Cypress.Commands.add('seedDb', () => {
	cy.request('POST', 'http://localhost:5000/recommendations/seed', {});
});

Cypress.Commands.add('createRecommendationTest', (body) => {
	cy.visit('http://localhost:3000/');

	cy.get('#name').type(body.name);
	cy.get('#url').type(body.youtubeLink);

	cy.intercept('POST', 'http://localhost:5000/recommendations').as('createRecommendations'); 
	cy.get('button').click();
	cy.wait('@createRecommendations');
});

Cypress.Commands.add('alertTest', () => {
	cy.on('window:alert', (text) => {
		expect(text).to.contains('Error creating recommendation!');
	});
});
  
Cypress.Commands.add('upVote', () => {
	cy.visit('http://localhost:3000/');

	cy.get('#arrowUp').click();

	cy.get('#score').should('contain', '1');
});

Cypress.Commands.add('downVote', () => {
	cy.visit('http://localhost:3000/');

	cy.get('#arrowDown').click();

	cy.get('#score').should('contain', '0');
});

Cypress.Commands.add('random', () => {
	cy.visit('http://localhost:3000/');

	cy.intercept('GET', '/recommendations/random').as('randomRecommendation');
	cy.contains('Random').click();
	cy.wait('@randomRecommendation');
	
	cy.url().should("equal", "http://localhost:3000/random");

	cy.get('article').should('have.length', 1);
});


Cypress.Commands.add('top', () => {
	cy.visit('http://localhost:3000/');

	cy.contains('Top').click();

	cy.url().should("equal", "http://localhost:3000/top");

	cy.get('article').should('have.length', 4);
});
