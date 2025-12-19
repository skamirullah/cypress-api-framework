const { defineConfig } = require("cypress");
const { getEnvConfig } = require("./cypress/utils/envManager");

const isCI = process.env.CI === "true";

module.exports = defineConfig({
  reporter: isCI ? "spec" : "cypress-mochawesome-reporter",

  reporterOptions: isCI
    ? {}
    : {
      reportDir: "reports",
      reportFilename: "index",
      charts: true,
      inlineAssets: true,
      reportPageTitle: "API Automation Report"
    },

  e2e: {
    specPattern: "cypress/e2e/api/**/*.cy.js",

    setupNodeEvents(on, config) {
      // ❌ NO ALLURE HERE — EVER

      if (!isCI) {
        require("cypress-mochawesome-reporter/plugin")(on);
      }

      const envName = config.env.env || "qa";
      const envConfig = getEnvConfig(envName);

      config.baseUrl = envConfig.baseUrl;
      config.env.currentEnv = envName;

      return config;
    }
  }
});
