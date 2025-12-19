import { apiRequest } from "../../support/apiClient";
import { buildLoginPayload } from "../../utils/authPayloadBuilder";

describe("Auth Setup", () => {

    before(() => {
        const payload = buildLoginPayload();

        apiRequest({
            method: "POST",
            url: "/auth/login",
            body: payload
        }).then((res) => {
            expect(res.status).to.eq(200);
            Cypress.env("ACCESS_TOKEN", res.body.accessToken);
        });
    });

    it("Auth token should be generated", () => {
        expect(Cypress.env("ACCESS_TOKEN")).to.not.be.undefined;
    });

});
