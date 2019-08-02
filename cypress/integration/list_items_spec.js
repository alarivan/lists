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

  it("Doesn't close ItemForm if multiple-toggle is active", function() {
    cy.get("[data-cy=item-new-button-inline]").click();

    cy.focused().should("have.attr", "placeholder", "Item Name");

    cy.get("[data-cy=item-new-name] [data-cy=input-text]").type(itemName);

    cy.get("[data-cy=item-new-multiple-toggle]").click();

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-item]").should("contain", itemName);

    cy.focused().should("have.value", "");
  });

  it("Clears form after ItemForm is closed", function() {
    cy.get("[data-cy=item-new-button-fixed]").click();

    cy.get("[data-cy=item-new-name] [data-cy=input-text]").type(itemName);

    cy.get("[data-cy=item-new-multiple-toggle]").click();

    cy.get("[data-cy=simple-form-cancel]").click();

    cy.get("[data-cy=item-new-button-inline]").click();

    cy.focused().should("have.value", "");

    cy.get("[data-cy=item-new-multiple-toggle]").should(
      "not.have.class",
      "enabled"
    );
  });

  it("Correctly shows and updates suggested Items", function() {
    ["Item 1", "item 2", "Item 3"].forEach(name => cy.addItem(name));

    Array(2)
      .fill()
      .forEach(() =>
        cy
          .get("[data-cy=list-item]")
          .eq(0)
          .click()
      );

    cy.checkListItemStatusByIndex(0, false);
    cy.checkListItemStatusByIndex(1, true);
    cy.checkListItemStatusByIndex(2, true);

    cy.get("[data-cy=item-new-button-fixed]").click();

    cy.get("[data-cy=item-new-name] [data-cy=input-text]").type("it");

    cy.get("[data-cy=item-form-suggest]")
      .find("[data-cy=list-item]")
      .should("have.length", 2);

    cy.get("[data-cy=item-form-suggest] [data-cy=list-item]")
      .eq(0)
      .click();

    cy.get("[data-cy=item-form-suggest]")
      .find("[data-cy=list-item]")
      .should("have.length", 1);

    cy.checkListItemStatusByIndex(0, false);
    cy.checkListItemStatusByIndex(1, false);
    cy.checkListItemStatusByIndex(2, true);
  });
});
