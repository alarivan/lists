/// <reference types="Cypress" />

describe("List", function() {
  beforeEach(() => {
    const listName = "Test List";

    cy.visit("/");

    cy.get(".new-fixed")
      .click()
      .should("exist");

    cy.get('[data-modal="list-new-form"]').should("exist");

    cy.focused().should("have.attr", "placeholder", "List Name");

    cy.get(".simple-form input").type(listName);

    cy.get(".simple-form-actions-button.save").click();

    cy.get(".component-list .list-head h1").should("contain", listName);

    cy.url().should("include", "/list/");
  });

  it("Adds an Item to List", function() {
    const itemName = "Item 1";

    cy.get(".new-fixed").click();

    cy.focused().should("have.attr", "placeholder", "Item Name");

    cy.get(".simple-form input").type(itemName);

    cy.get(".simple-form-actions-button.save").click();

    cy.get(".list-items").should("contain", "Item 1");
  });
});
