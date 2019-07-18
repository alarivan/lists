/// <reference types="Cypress" />

const listName = "Test List";
describe("Lists Page", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Creates List", function() {
    cy.get("[data-cy=list-new-button]")
      .should("exist")
      .click();

    cy.get("[data-cy=list-new-form]").should("exist");

    cy.focused().should("have.attr", "placeholder", "List Name");

    cy.get("[data-cy=list-new-name]")
      .should("exist")
      .type(listName);

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-head-name]").should("contain", listName);

    cy.url().should("include", "/list/");
  });

  it.only("Creates List from Empty Block", function() {
    cy.get("[data-cy=empty-block-button]")
      .should("exist")
      .click();

    cy.get("[data-cy=list-new-form]").should("exist");

    cy.focused().should("have.attr", "placeholder", "List Name");

    cy.get("[data-cy=list-new-name]")
      .should("exist")
      .type(listName);

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-head-name]").should("contain", listName);

    cy.url().should("include", "/list/");
  });

  it("Cancels List Creation", function() {
    cy.get("[data-cy=list-new-button]").click();

    cy.get("[data-cy=simple-form-cancel]").click();

    cy.get("[data-cy=list-new-button]").click();

    cy.focused().should("have.value", "");
  });

  it("Deletes List", function() {
    cy.createList(listName);
    cy.visit("/");

    cy.get("[data-cy=list-head-button-delete]").click();

    cy.get("[data-cy=dialog-text]").should("contain", `Delete ${listName}?`);

    cy.get("[data-cy=dialog-confirm]").click();

    cy.get("[data-cy=lists-list]").should("not.exist");
  });

  it("Cancels List Delete action", function() {
    cy.createList(listName);
    cy.visit("/");

    cy.get("[data-cy=list-head-button-delete]").click();

    cy.get("[data-cy=dialog-cancel]").click();

    cy.get("[data-cy=lists-list]").should("exist");
  });

  it("Has View Link", function() {
    cy.createList(listName);
    cy.visit("/");

    cy.get("[data-cy=list-view-button]")
      .should("have.attr", "href")
      .and("contain", "/list/");
  });
});
