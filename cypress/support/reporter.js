export const addRequestToReport = (request) => {
    attachToReport("API Request", request);
};

export const addResponseToReport = (response) => {
    attachToReport("API Response", response);
};

const attachToReport = (title, data) => {
    const formatted =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);

    // ✅ Allure (CI)
    if (isAllureAvailable()) {
        // global allure object provided by `allure-cypress`
        allure.attachment(title, formatted, "application/json");
        return;
    }

    // ✅ Mochawesome (Local)
    if (Cypress.Commands.has("addTestContext")) {
        cy.addTestContext({
            title,
            value: formatted
        });
    }
};

const isAllureAvailable = () => {
    // allure is injected globally by `import "allure-cypress"`
    return typeof allure !== "undefined";
};
