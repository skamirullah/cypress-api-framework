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
        reportPageTitle: "API Automation Report",
        saveAllAttempts: false
      },

  e2e: {
    specPattern: "cypress/e2e/api/**/*.cy.js",

    setupNodeEvents(on, config) {
      // ✅ REQUIRED for allure-cypress (THIS FIXES YOUR ERROR)
      require("allure-cypress/plugin")(on, config);

      // Local-only mochawesome
      if (!isCI) {
        require("cypress-mochawesome-reporter/plugin")(on);
      }

      // 🌍 Environment handling
      const envName = config.env.env || "qa";
      const envConfig = getEnvConfig(envName);

      config.baseUrl = envConfig.baseUrl;
      config.env.currentEnv = envName;

      return config;
    }
  }
});
