/// <reference types="Cypress" />

describe("List Panel Stats", function() {
  beforeEach(() => {
    cy.visit("/");

    cy.createList("Test List");

    cy.addItem("Item 1");
    cy.addItem("Item 2");
  });

  it("Shows correct numbers in stats", function() {
    cy.get("[data-cy=list-stats-item-complete]").should("not.exist");
    cy.get("[data-cy=list-stats-item-incomplete]").should("contain", 2);

    cy.listItemClick(0);

    cy.get("[data-cy=list-stats-item-complete]").should("contain", 1);
    cy.get("[data-cy=list-stats-item-incomplete]").should("contain", 1);

    cy.listItemClick(0);

    cy.get("[data-cy=list-stats-item-complete]").should("contain", 2);
    cy.get("[data-cy=list-stats-item-incomplete]").should("not.exist");
  });

  it("Opens and closes More Menu", function() {
    cy.get("[data-cy=list-panel-more]").should("not.be.visible");

    cy.shouldHaveTitle("[data-cy=list-panel-more-options]", "Show Options");

    cy.shouldHaveIcon("[data-cy=list-panel-more-options]", "#icon-menu-down");

    cy.get("[data-cy=list-panel-more-options]").click();

    cy.shouldHaveTitle("[data-cy=list-panel-more-options]", "Hide Options");

    cy.shouldHaveIcon("[data-cy=list-panel-more-options]", "#icon-menu-up");

    cy.get("[data-cy=list-panel-more]").should("exist");

    cy.get("[data-cy=list-panel-more-options]").click();

    cy.get("[data-cy=list-panel-more]").should("not.be.visible");

    cy.shouldHaveTitle("[data-cy=list-panel-more-options]", "Show Options");

    cy.shouldHaveIcon("[data-cy=list-panel-more-options]", "#icon-menu-down");
  });
});
