/// <reference types="Cypress" />

const listName = "Test List";
describe("Lists Page", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Creates List", function() {
    cy.get("[data-cy=list-new-button-inline]").click();

    cy.get("[data-cy=list-new-form]").should("exist");

    cy.focused().should("have.attr", "placeholder", "List Name");

    cy.get("[data-cy=list-new-name] [data-cy=input-text]").type(listName);

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-head] [data-cy=list-name]").should(
      "contain",
      listName
    );

    cy.url().should("include", "/list/");
  });

  it("Creates List from Empty Block", function() {
    cy.get("[data-cy=empty-block-button]").click();

    cy.get("[data-cy=list-new-form]").should("exist");

    cy.get("[data-cy=list-new-name] [data-cy=input-text]").type(listName);

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-head] [data-cy=list-name]").should(
      "contain",
      listName
    );

    cy.url().should("include", "/list/");
  });

  it("Cancels List Creation", function() {
    cy.get("[data-cy=list-new-button-fixed]").click();

    cy.get("[data-cy=simple-form-cancel]").click();

    cy.get("[data-cy=list-new-button-inline]").click();

    cy.focused().should("have.value", "");
  });

  it("Has View Link", function() {
    cy.createList(listName);
    cy.visit("/");

    cy.get("[data-cy=list-view-button]")
      .should("have.attr", "href")
      .and("contain", "/list/");
  });
});
