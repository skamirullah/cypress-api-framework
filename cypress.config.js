const { defineConfig } = require("cypress");
const { getEnvConfig } = require("./cypress/utils/envManager");

module.exports = defineConfig({

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "reports",
    charts: true,
    embeddedScreenshots: false,
    inlineAssets: true,
    reportPageTitle: "API Automation Report",
    showTestCode: false,
    code: false,
    saveAllAttempts: false
  },

  e2e: {
    specPattern: "cypress/e2e/api/**/*.cy.js",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      console.log('🔍 Cypress reporter:', 'cypress-mochawesome-reporter');
      const envName = config.env.env || "qa";
      const envConfig = getEnvConfig(envName);
      config.baseUrl = envConfig.baseUrl;
      config.env.currentEnv = envName;

      return config;
    }
  }
});
