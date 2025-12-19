const { defineConfig } = require("cypress");
const { getEnvConfig } = require("./cypress/utils/envManager");

const isCI = process.env.CI === "true";

module.exports = defineConfig({

  // 🔁 Switch reporter based on environment
  reporter: isCI
    ? "spec"
    : "cypress-mochawesome-reporter",

  reporterOptions: isCI
    ? {}
    : {
      // Mochawesome (used locally)
      reportDir: "reports",
      reportFilename: "index.html",
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

      // 🔌 Reporter plugins
      if (isCI) {
        // Allure plugin for Jenkins
        // require("allure-cypress/on")(on, config);
        // console.log("🔍 Cypress reporter: Allure (CI)");
      } else {
        // Mochawesome plugin for local
        require("cypress-mochawesome-reporter/plugin")(on);
        console.log("🔍 Cypress reporter: Mochawesome (Local)");
      }

      // 🌍 Environment handling (UNCHANGED)
      const envName = config.env.env || "qa";
      const envConfig = getEnvConfig(envName);

      config.baseUrl = envConfig.baseUrl;
      config.env.currentEnv = envName;

      return config;
    }
  }
});
