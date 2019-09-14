/// <reference types="Cypress" />

const updateEvent = new CustomEvent("swUpdated", { detail: { waiting: null } });
describe("Update", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show update dialog", function() {
    cy.document().then(doc => {
      doc.dispatchEvent(updateEvent);

      cy.get("[data-cy=dialog-text]").should("contain", "Update Available");
      cy.get("[data-cy=dialog-confirm]").should("have.class", "success");
      cy.get("[data-cy=dialog-confirm]").click();

      cy.get("[data-cy=header-update-button]").should("not.exist");
    });
  });

  it("should show update dialog and update button", function() {
    cy.document().then(doc => {
      doc.dispatchEvent(updateEvent);

      cy.get("[data-cy=dialog-cancel]").click();

      cy.get("[data-cy=header-update-button]").should("exist");
    });
  });
});
