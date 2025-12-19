// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
// Load Allure runtime ALWAYS in CI
require("@shelex/cypress-allure-plugin");

// 🔥 FORCE Cypress runtime execution
beforeEach(() => {
    cy.wrap(null, { log: false });
});

// Load Mochawesome only for local runs
if (process.env.CI !== "true") {
    require("cypress-mochawesome-reporter/register");
}