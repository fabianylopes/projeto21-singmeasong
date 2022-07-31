Cypress.Commands.add('insertRecommandation', (body) => {
    cy.visit('http://localhost:3000/');
  
    cy.get('#name').type(body.name);
    cy.get('#url').type(body.url);
  
    cy.intercept("POST", "/recommendations").as('insertRecommandation')
    cy.get("#button").click();
    cy.wait("@insertRecommandation");
});

Cypress.Commands.add('resetDb', () => {
    cy.request('POST', "http://localhost:5000/reset", {});
  });