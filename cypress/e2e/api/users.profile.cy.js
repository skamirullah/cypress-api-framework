import { apiRequest } from "../../support/apiClient";
import { buildLoginPayload } from "../../utils/authPayloadBuilder";

describe("Protected Resource API", () => {

    before(() => {
        apiRequest({
            method: "POST",
            url: "/auth/login",
            body: buildLoginPayload()
        }).then((res) => {
            Cypress.env("ACCESS_TOKEN", res.body.accessToken);
        });
    });

    it("Should fetch user profile using access token", () => {

        apiRequest({
            method: "GET",
            url: "/auth/me",
            auth: true
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("username");
        });

    });

});
