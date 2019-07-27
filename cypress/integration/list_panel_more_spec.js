/// <reference types="Cypress" />

describe("List Panel Actions", function() {
  beforeEach(() => {
    cy.visit("/");

    cy.createList("Test List");

    cy.addItem("Item 1");
    cy.addItem("Item 2");

    cy.get("[data-cy=list-panel-more-options]").click();
  });

  it("Correctly switches order of items", function() {
    cy.get("[data-cy=list-panel-sort-direction] [data-cy=icon-use]").should(
      "have.attr",
      "xlink:href",
      "#icon-move-up"
    );

    cy.get("[data-cy=list-item]")
      .eq(0)
      .click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark");

    cy.get("[data-cy=list-item]")
      .eq(1)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get("[data-cy=list-panel-sort-direction]").click();

    cy.get("[data-cy=list-panel-sort-direction] [data-cy=icon-use]").should(
      "have.attr",
      "xlink:href",
      "#icon-move-down"
    );

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get("[data-cy=list-item]")
      .eq(1)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark");
  });

  it("Doesn't switch order of items when sort is disabled", function() {
    cy.get("[data-cy=list-panel-sort-status] [data-cy=icon-use]").should(
      "have.attr",
      "xlink:href",
      "#icon-tab"
    );

    cy.get("[data-cy=list-panel-sort-status]").click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get("[data-cy=list-item]")
      .eq(1)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark");

    cy.get("[data-cy=list-panel-sort-direction]").click();

    cy.get("[data-cy=list-panel-sort-direction] [data-cy=icon-use]").should(
      "have.attr",
      "xlink:href",
      "#icon-move-down"
    );

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get("[data-cy=list-item]")
      .eq(1)
      .find("[data-cy=icon-use]")
      .should("have.attr", "xlink:href", "#icon-checkmark");
  });

  it("Doesn't show completed items when showComplete is diasbled", function() {
    cy.get("[data-cy=list-panel-show-complete] [data-cy=icon-use]").should(
      "have.attr",
      "xlink:href",
      "#icon-checkmark1"
    );

    cy.get("[data-cy=list-items]")
      .find("[data-cy=list-item]")
      .should("have.length", 2);

    cy.get("[data-cy=list-panel-show-complete]").click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .click();

    cy.get("[data-cy=list-items]")
      .find("[data-cy=list-item]")
      .should("have.length", 1);
  });

  it("shows order number when sortByOrder is enabled", function() {
    cy.get("[data-cy=list-panel-sort-by-order] [data-cy=icon-use]").should(
      "have.attr",
      "xlink:href",
      "#icon-list-numbered"
    );

    cy.get("[data-cy=list-items]")
      .find("[data-cy=list-item]")
      .should("have.length", 2);

    cy.get("[data-cy=list-panel-sort-by-order]").click();

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=item-order]")
      .should("contain", 1);

    cy.get("[data-cy=list-item]")
      .eq(1)
      .find("[data-cy=item-order]")
      .should("contain", 2);

    cy.addItem("Item 3");

    cy.get("[data-cy=list-item]")
      .eq(2)
      .find("[data-cy=item-order]")
      .should("contain", 3);
  });

  it("doesn't show order number when sortByOrder is disabled", function() {
    cy.get("[data-cy=list-items]")
      .find("[data-cy=list-item]")
      .should("have.length", 2);

    cy.get("[data-cy=list-item]")
      .eq(0)
      .find("[data-cy=item-order]")
      .should("not.exist");

    cy.get("[data-cy=list-item]")
      .eq(1)
      .find("[data-cy=item-order]")
      .should("not.exist");

    const item3Name = "Item 3";
    cy.addItem(item3Name);

    cy.get("[data-cy=list-item]")
      .eq(0)
      .should("contain", item3Name);
  });
});
