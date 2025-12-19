import { addRequestToReport, addResponseToReport } from "./reporter";

export const apiRequest = ({
    method,
    url,
    body = null,
    headers = {},
    auth = false
}) => {

    const token = Cypress.env("ACCESS_TOKEN");

    const finalHeaders = {
        "Content-Type": "application/json",
        ...headers
    };

    if (auth) {
        if (!token) {
            throw new Error("ACCESS_TOKEN is not set. Login must be performed before calling auth APIs.");
        }
        finalHeaders.Authorization = `Bearer ${token}`;
    }

    // ✅ ALWAYS log request (GET/POST/etc)
    const requestForReport = {
        method,
        url: `${Cypress.config("baseUrl")}${url}`,
        headers: auth ? { Authorization: "Bearer *****" } : {},
        payload: body ? maskSensitive(body) : null
    };

    addRequestToReport(requestForReport);

    // ✅ Cypress command chain MUST be returned
    return cy.request({
        method,
        url,
        body,
        headers: finalHeaders,
        failOnStatusCode: false
    }).then((res) => {

        // ✅ ALWAYS log response
        addResponseToReport(res.body);

        // ✅ Keep Cypress chain intact
        return cy.wrap(res, { log: false });
    });
};

const maskSensitive = (body) => {
    if (!body) return null;

    const cloned = { ...body };
    if (cloned.password) cloned.password = "*****";
    if (cloned.accessToken) cloned.accessToken = "*****";
    if (cloned.refreshToken) cloned.refreshToken = "*****";

    return cloned;
};
