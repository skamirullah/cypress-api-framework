export const setToken = (token) => {
  Cypress.env("AUTH_TOKEN", token);
};

export const getToken = () => {
  return Cypress.env("AUTH_TOKEN");
};
