export const apiURL = (path: string) =>
  `${Cypress.env("BACKEND_API")}/api/v1${path}`;
