/// <reference types="Cypress" />

const itemName = "Item 1";

describe("List Items", function() {
  beforeEach(() => {
    cy.visit("/");

    cy.createList("Test List");
  });

  it("Adds an Item to List", function() {
    cy.get("[data-cy=item-new-button-fixed]").click();

    cy.focused().should("have.attr", "placeholder", "Item Name");

    cy.get("[data-cy=item-new-name] [data-cy=input-text]").type(itemName);

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-item]").should("contain", itemName);
  });

  it("Deletes an Item from List", function() {
    cy.addItem(itemName);

    cy.get("[data-cy=item-delete-button]").click();

    cy.get("[data-cy=dialog-confirm]").click();

    cy.get("[data-cy=list-items]")
      .find("[data-cy=list-item]")
      .should("have.length", 0);
  });

  it("Cancels Item delete action", function() {
    cy.addItem(itemName);

    cy.get("[data-cy=item-delete-button]").click();

    cy.get("[data-cy=dialog-cancel]").click();

    cy.get("[data-cy=list-items]")
      .find("[data-cy=list-item]")
      .should("have.length", 1);
  });

  it("Updates item status", function() {
    cy.addItem(itemName);

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark");

    cy.get("[data-cy=list-item]").click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get("[data-cy=list-item]").click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark");
  });
});
