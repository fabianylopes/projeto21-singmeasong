Cypress.Commands.add("resetDb", () => {
cy.request("POST", "http://localhost:5000/recommendations/reset", {});
});

Cypress.Commands.add("seedDb", () => {
    cy.request("POST", "http://localhost:5000/recommendations/seed", {});
});

Cypress.Commands.add("createRecommendation", (body) => {
    cy.visit("http://localhost:3000/");

    cy.get('#name').type(body.name);
    cy.get('#url').type(body.youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as("createRecommendations"); 
    cy.get("button").click();
    cy.wait("@createRecommendations");
});

Cypress.Commands.add("alertTest", () => {
    cy.on("window:alert", (text) => {
        expect(text).to.contains("Error creating recommendation!");
    });
});
  
Cypress.Commands.add("upVote", () => {
    cy.visit("http://localhost:3000/");

    cy.get('#arrowUp').click();

    cy.get('#score').should('contain', '1');
});

Cypress.Commands.add("downVote", () => {
    cy.visit("http://localhost:3000/");

    cy.get('#arrowDown').click();

    cy.get('#score').should('contain', '-1');
});

