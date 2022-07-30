Cypress.Commands.add("resetDb", () => {
    cy.log("cleanning database");
    cy.request("POST", "http://localhost:5000/reset", {});
});