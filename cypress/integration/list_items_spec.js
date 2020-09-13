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

    cy.listItemsShouldHaveLength("[data-cy=list-items]", 0);
  });

  it("Cancels Item delete action", function() {
    cy.addItem(itemName);

    cy.get("[data-cy=item-delete-button]").click();

    cy.get("[data-cy=dialog-cancel]").click();

    cy.listItemsShouldHaveLength("[data-cy=list-items]", 1);
  });

  it("Updates item status", function() {
    cy.addItem(itemName);

    cy.listItemShouldHaveStatus(0, false);

    cy.get("[data-cy=list-item]").click();

    cy.listItemShouldHaveStatus(0, true);

    cy.get("[data-cy=list-item]").click();

    cy.listItemShouldHaveStatus(0, false);
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

  it.only("Correctly shows and updates suggested Items", function() {
    const typedValue = "it";
    ["Item 1", "item 2", "Item 3", "other"].forEach((name) => cy.addItem(name));

    for (let i = 0; i < 3; i++) {
      cy.listItemClick(0);
    }

    [false, true, true, true].forEach((v, i) =>
      cy.listItemShouldHaveStatus(i, v)
    );

    cy.get("[data-cy=item-new-button-fixed]").click();

    cy.get("[data-cy=item-new-name] [data-cy=input-text]").type(typedValue);

    cy.listItemsShouldHaveLength("[data-cy=item-form-suggest]", 2);

    cy.get("[data-cy=item-form-suggest]").should("not.contain", "other");

    cy.listItemClick(0, "[data-cy=item-form-suggest]");

    cy.listItemsShouldHaveLength("[data-cy=item-form-suggest]", 0);

    cy.focused().should("have.value", "");

    [false, false, true, true].forEach((v, i) =>
      cy.listItemShouldHaveStatus(i, v)
    );
  });

  it("Adds nested list", function() {
    cy.get("[data-cy=item-new-button-fixed]").click();

    cy.focused().should("have.attr", "placeholder", "Item Name");

    cy.get("[data-cy=item-new-name] [data-cy=input-text]").type(itemName);

    cy.get("[data-cy=item-new-list-toggle]").click();

    cy.get("[data-cy=simple-form-submit]").click();

    cy.get("[data-cy=list-items] [data-cy=list-item-nested]").should(
      "contain",
      itemName
    );

    cy.get(
      "[data-cy=list-item-nested] [data-cy=list-head-button-toggle]"
    ).click();

    cy.get(
      "[data-cy=list-item-nested] [data-cy=list-head-button-delete]"
    ).should("exist");
    cy.get("[data-cy=list-item-nested] [data-cy=list-head-button-edit]").should(
      "exist"
    );
    cy.get(
      "[data-cy=list-item-nested] [data-cy=list-head-button-add-item]"
    ).should("exist");

    cy.get(
      "[data-cy=list-item-nested] [data-cy=list-head-button-toggle]"
    ).click();

    cy.get(
      "[data-cy=list-item-nested] [data-cy=list-head-button-delete]"
    ).should("not.exist");
    cy.get("[data-cy=list-item-nested] [data-cy=list-head-button-edit]").should(
      "not.exist"
    );
    cy.get(
      "[data-cy=list-item-nested] [data-cy=list-head-button-add-item]"
    ).should("not.exist");
  });
});
