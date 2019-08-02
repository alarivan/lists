/// <reference types="Cypress" />

const getListItemOrder = index => {
  return cy
    .get("[data-cy=list-item]")
    .eq(index)
    .find("[data-cy=item-order]");
};

describe("List Panel Actions", function() {
  beforeEach(() => {
    cy.visit("/");

    cy.createList("Test List");

    cy.addItem("Item 1");
    cy.addItem("Item 2");

    cy.get("[data-cy=list-panel-more-options]").click();
  });

  it("Correctly switches order of items", function() {
    cy.shouldHaveIcon("[data-cy=list-panel-sort-direction]", "#icon-move-up");

    cy.listItemClick(0);

    cy.listItemShouldHaveStatus(0, false);
    cy.listItemShouldHaveStatus(1, true);

    cy.get("[data-cy=list-panel-sort-direction]").click();

    cy.shouldHaveIcon("[data-cy=list-panel-sort-direction]", "#icon-move-down");

    cy.listItemShouldHaveStatus(0, true);
    cy.listItemShouldHaveStatus(1, false);
  });

  it("Doesn't switch order of items when sort is disabled", function() {
    cy.shouldHaveIcon("[data-cy=list-panel-sort-status]", "#icon-tab");

    cy.get("[data-cy=list-panel-sort-status]").click();

    cy.listItemClick(0);

    cy.listItemShouldHaveStatus(0, true);
    cy.listItemShouldHaveStatus(1, false);

    cy.get("[data-cy=list-panel-sort-direction]").click();

    cy.shouldHaveIcon("[data-cy=list-panel-sort-direction]", "#icon-move-down");

    cy.listItemShouldHaveStatus(0, true);
    cy.listItemShouldHaveStatus(1, false);
  });

  it("Doesn't show completed items when showComplete is diasbled", function() {
    cy.shouldHaveIcon("[data-cy=list-panel-show-complete]", "#icon-checkmark1");

    cy.listItemsShouldHaveLength("[data-cy=list-items]", 2);

    cy.get("[data-cy=list-panel-show-complete]").click();

    cy.listItemClick(0);

    cy.listItemsShouldHaveLength("[data-cy=list-items]", 1);
  });

  it("Shows order number when sortByOrder is enabled", function() {
    cy.shouldHaveIcon(
      "[data-cy=list-panel-sort-by-order]",
      "#icon-list-numbered"
    );

    cy.listItemsShouldHaveLength("[data-cy=list-items]", 2);

    cy.get("[data-cy=list-panel-sort-by-order]").click();

    getListItemOrder(0).should("contain", 1);

    getListItemOrder(1).should("contain", 2);

    cy.addItem("Item 3");

    getListItemOrder(2).should("contain", 3);
  });

  it("Doesn't show order number when sortByOrder is disabled", function() {
    cy.listItemsShouldHaveLength("[data-cy=list-items]", 2);

    getListItemOrder(0).should("not.exist");
    getListItemOrder(1).should("not.exist");

    const item3Name = "Item 3";
    cy.addItem(item3Name);

    cy.get("[data-cy=list-item]")
      .eq(0)
      .should("contain", item3Name);
  });
});
