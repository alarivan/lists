/// <reference types="Cypress" />

function addItem(itemName) {
  cy.get(".new-fixed").click();

  cy.focused().should("have.attr", "placeholder", "Item Name");

  cy.get(".simple-form input").type(itemName);

  cy.get(".simple-form-actions-button.save").click();

  cy.get(".list-items").should("contain", itemName);
}

describe("List", function() {
  beforeEach(() => {
    const listName = "Test List";

    cy.visit("http://localhost:8080");

    cy.get(".new-fixed")
      .click()
      .should("exist");

    cy.get('[data-modal="list-new-form"]').should("exist");

    cy.focused().should("have.attr", "placeholder", "List Name");

    cy.get(".simple-form input").type(listName);

    cy.get(".simple-form-actions-button.save").click();

    cy.get(".component-list .list-head h1").should("contain", listName);

    cy.url().should("include", "/list/");

    ["Item 1", "Item 2"].forEach(i => {
      addItem(i);
    });
  });

  it("Shows correct numbers in stats", function() {
    cy.get(".stats-item-incomplete").should("contain", 2);
    cy.get(".stats-item-complete").should("not.exist");

    cy.get(".list-items .list-item")
      .eq(0)
      .click();

    cy.get(".stats-item-incomplete").should("contain", 1);
    cy.get(".stats-item-complete").should("contain", 1);

    cy.get(".list-items .list-item")
      .eq(0)
      .click();

    cy.get(".stats-item-incomplete").should("not.exist");
    cy.get(".stats-item-complete").should("contain", 2);
  });

  it("Opens and closes More Menu", function() {
    cy.get(".list-panel-more-options").should(
      "have.attr",
      "title",
      "Show Options"
    );
    cy.get(".list-panel-more-options svg.icon use").should(
      "have.attr",
      "xlink:href",
      "#icon-menu-down"
    );

    cy.get(".list-panel-more").should("not.exist");

    cy.get(".list-panel-more-options").click();
    cy.get(".list-panel-more-options").should(
      "have.attr",
      "title",
      "Hide Options"
    );
    cy.get(".list-panel-more-options svg.icon use").should(
      "have.attr",
      "xlink:href",
      "#icon-menu-up"
    );

    cy.get(".list-panel-more").should("exist");
  });

  it("Correctly switches order of items", function() {
    cy.get(".list-panel-more-options").click();

    cy.get(".list-panel-sort-direction svg.icon use").should(
      "have.attr",
      "xlink:href",
      "#icon-move-up"
    );

    cy.get(".list-items .list-item")
      .eq(0)
      .click();

    cy.get(".list-items .list-item")
      .eq(0)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark");

    cy.get(".list-items .list-item")
      .eq(1)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get(".list-panel-sort-direction").click();

    cy.get(".list-panel-sort-direction svg.icon use").should(
      "have.attr",
      "xlink:href",
      "#icon-move-down"
    );

    cy.get(".list-items .list-item")
      .eq(0)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get(".list-items .list-item")
      .eq(1)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark");
  });

  it("Doesn't switches order of items when sort is disabled", function() {
    cy.get(".list-panel-more-options").click();

    cy.get(".list-panel-sort-status svg.icon use").should(
      "have.attr",
      "xlink:href",
      "#icon-tab"
    );

    cy.get(".list-panel-sort-status").click();

    cy.get(".list-items .list-item")
      .eq(0)
      .click();

    cy.get(".list-items .list-item")
      .eq(0)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get(".list-items .list-item")
      .eq(1)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark");

    cy.get(".list-panel-sort-direction").click();

    cy.get(".list-items .list-item")
      .eq(0)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark1");

    cy.get(".list-items .list-item")
      .eq(1)
      .find(".checkmark svg.icon use")
      .should("have.attr", "xlink:href", "#icon-checkmark");
  });

  it("Doesn't show completed items when showComplete is diasbled", function() {
    cy.get(".list-panel-more-options").click();

    cy.get(".list-panel-show-complete svg.icon use").should(
      "have.attr",
      "xlink:href",
      "#icon-checkmark1"
    );

    cy.get(".list-items")
      .find(".list-item")
      .should("have.length", 2);

    cy.get(".list-panel-show-complete").click();

    cy.get(".list-items .list-item")
      .eq(0)
      .click();

    cy.get(".list-items")
      .find(".list-item")
      .should("have.length", 1);
  });
});
