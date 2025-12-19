export const addRequestToReport = (request) => {
    attach("API Request", request);
};

export const addResponseToReport = (response) => {
    attach("API Response", response);
};

function attach(title, data) {
    const content =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);

    // ✅ Allure (CI & local if enabled)
    if (typeof allure !== "undefined") {
        allure.attachment(title, content, "application/json");
        return;
    }

    // ✅ Mochawesome (local)
    if (typeof cy.addTestContext === "function") {
        cy.addTestContext({ title, value: content });
    }
}
