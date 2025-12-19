const { defineConfig } = require("cypress");
const { getEnvConfig } = require("./cypress/utils/envManager");
const { allureCypressTasks } = require("allure-cypress/tasks");

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
      // ✅ REQUIRED for allure-cypress
      on("task", allureCypressTasks());

      // Local-only mochawesome plugin
      if (!isCI) {
        require("cypress-mochawesome-reporter/plugin")(on);
      }

      // 🌍 Env handling
      const envName = config.env.env || "qa";
      const envConfig = getEnvConfig(envName);

      config.baseUrl = envConfig.baseUrl;
      config.env.currentEnv = envName;

      return config;
    }
  }
});
