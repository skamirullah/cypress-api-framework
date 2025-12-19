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
    allure.attachment(title, formatted, "application/json");
    return;
  }

  // ✅ Mochawesome (Local)
  if (typeof cy.addTestContext === "function") {
    cy.addTestContext({
      title,
      value: formatted
    });
  }
};

const isAllureAvailable = () => {
  return typeof allure !== "undefined";
};
