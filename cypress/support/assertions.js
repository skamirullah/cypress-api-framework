export const assertStatus = (res, code) => {
    expect(res.status).to.eq(code);
};

export const assertHasKey = (res, key) => {
    expect(res.body).to.have.property(key);
};

export const assertMessage = (response, expectedMessage) => {
    expect(response.body.Msg).to.eq(expectedMessage);
};

export const assertTokenGeneration = (response) => {
    expect(response.body).to.have.property("accessToken");
};
