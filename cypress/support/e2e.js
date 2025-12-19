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
// Allure runtime (required to collect test results)
require("@shelex/cypress-allure-plugin");

// Mochawesome runtime only for local runs
if (!Cypress.env("CI")) {
    require("cypress-mochawesome-reporter/register");
}