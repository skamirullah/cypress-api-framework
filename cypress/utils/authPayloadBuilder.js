export const buildLoginPayload = () => {
  const env = Cypress.env("currentEnv").toUpperCase();

  return {
    username: Cypress.env(`${env}_USERNAME`),
    password: Cypress.env(`${env}_PASSWORD`)
  };
};