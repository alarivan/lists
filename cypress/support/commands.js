// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("addItem", itemName => {
  cy.get(".new-fixed").click();

  cy.get(".simple-form input").type(itemName);

  cy.get(".simple-form-actions-button.save").click();
});

Cypress.Commands.add("createList", listName => {
  cy.visit("/");

  cy.get(".new-fixed").click();

  cy.get(".simple-form input").type(listName);

  cy.get(".simple-form-actions-button.save").click();
});

Cypress.Commands.add("listItemShouldHaveStatus", (index, status) => {
  const iconHref = status ? "#icon-checkmark1" : "#icon-checkmark";

  cy.get("[data-cy=list-items] [data-cy=list-item]")
    .eq(index)
    .find("[data-cy=icon-use]")
    .should("have.attr", "xlink:href", iconHref);
});

Cypress.Commands.add("listItemsShouldHaveLength", (parent, length) => {
  cy.get(parent)
    .find("[data-cy=list-item]")
    .should("have.length", length);
});

Cypress.Commands.add("listItemClick", (index, parent) => {
  const listItemSelector = "[data-cy=list-item]";
  const selector = parent ? `${parent} ${listItemSelector}` : listItemSelector;

  cy.get(selector)
    .eq(index)
    .click();
});

Cypress.Commands.add("shouldHaveIcon", (selector, iconHref) => {
  cy.get(`${selector} [data-cy=icon-use]`).should(
    "have.attr",
    "xlink:href",
    iconHref
  );
});

Cypress.Commands.add("shouldHaveTitle", (selector, title) => {
  cy.get(selector).should("have.attr", "title", title);
});
