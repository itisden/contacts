/// <reference types="cypress" />

declare namespace Cypress {
  // add custom commands here
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataTest('greeting')
     */
    getByDataTest(value: string): Chainable;
    login(user: { email: string; password: string }): void;
    logout(): void;
  }
}
