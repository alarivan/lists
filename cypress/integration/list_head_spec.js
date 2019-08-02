/// <reference types="Cypress" />

const listName = "Test List";
const listNameEdited = "Edited";
describe("List Items", function() {
  beforeEach(() => {
    cy.visit("/");

    cy.createList(listName);
  });

  it("Updates List name", function() {
    cy.get("[data-cy=list-head-button-edit]").click();

    cy.focused().should("have.value", listName);

    cy.get("[data-cy=list-head-edit-name]")
      .clear()
      .type(listNameEdited);

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-head] [data-cy=list-name]").should(
      "contain",
      listNameEdited
    );
  });

  it("Deletes List", function() {
    cy.get("[data-cy=list-head-button-delete]").click();

    cy.get("[data-cy=dialog-text]").should("contain", listName);

    cy.get("[data-cy=dialog-confirm]").click();

    cy.get("[data-cy=lists-list]").should("have.length", 0);
  });

  it("Cancels List delete dialog", function() {
    cy.get("[data-cy=list-head-button-delete]").click();

    cy.get("[data-cy=dialog-cancel]").click();

    cy.url().should("include", "/list/");

    cy.get("[data-cy=list-head] [data-cy=list-name]").should(
      "contain",
      listName
    );
  });
});
