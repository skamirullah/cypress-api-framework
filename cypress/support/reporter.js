export const addRequestToReport = (request) => {
    cy.addTestContext({
        title: "API Request",
        value: JSON.stringify(request, null, 2)
    });
};

export const addResponseToReport = (response) => {
    cy.addTestContext({
        title: "API Response",
        value: JSON.stringify(response, null, 2)
    });
};
