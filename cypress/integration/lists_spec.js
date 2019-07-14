/// <reference types="Cypress" />

const listName = "Test List";
describe("Lists Page", function() {
  beforeEach(() => {
    cy.visit("/");

    cy.get(".new-fixed")
      .click()
      .should("exist");

    cy.get('[data-modal="list-new-form"]').should("exist");

    cy.focused().should("have.attr", "placeholder", listName);
  });

  it("Creates List", function() {
    cy.get(".simple-form input").type(listName);

    cy.get(".simple-form-actions-button.save").click();

    cy.get(".component-list .list-head h1").should("contain", listName);

    cy.url().should("include", "/list/");
  });

  it("Cancels List Creation", function() {
    cy.get(".simple-form-actions-button.secondary").click();

    cy.get(".new-fixed").click();

    cy.focused().should("have.value", "");
  });
});
