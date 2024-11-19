import { apiURL } from "../utils/back";

describe("Authentication Flows", () => {
  const testUser = {
    email: "test@example.com",
    password: "12345678",
  };

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  describe("Signup Flow", () => {
    beforeEach(() => {
      cy.visit("/signup");
    });

    it("should show validation errors for empty form submission", () => {
      cy.getByDataTest("email-msg").should("not.exist");
      cy.getByDataTest("password-msg").should("not.exist");
      cy.getByDataTest("submit-button").click();
      cy.getByDataTest("email-msg").should("exist");
      cy.getByDataTest("password-msg").should("exist");
    });

    it("should successfully create account and redirect to login", () => {
      cy.intercept("POST", apiURL("/auth/signup"), {
        fixture: "auth/signup/successfulRes.json",
      }).as("signupRequest");

      cy.getByDataTest("email-input").type(testUser.email);
      cy.getByDataTest("password-input").type(testUser.password);

      cy.getByDataTest("submit-button").click();

      cy.wait("@signupRequest");
      cy.url().should("include", "/login");
    });

    it("should show error when email already exists", () => {
      cy.intercept("POST", apiURL("/auth/signup"), {
        fixture: "auth/signup/emailExistsRes.json",
        statusCode: 400,
      }).as("signupRequest");

      cy.getByDataTest("email-input").type(testUser.email);
      cy.getByDataTest("password-input").type(testUser.password);

      cy.getByDataTest("submit-button").click();

      cy.wait("@signupRequest");
      cy.fixture("auth/signup/emailExistsRes.json").then((data) => {
        cy.contains(data.message).should("be.visible");
      });
    });
  });

  describe("Login Flow", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("should show validation errors for empty form submission", () => {
      cy.getByDataTest("email-msg").should("not.exist");
      cy.getByDataTest("password-msg").should("not.exist");
      cy.getByDataTest("submit-button").click();
      cy.getByDataTest("email-msg").should("exist");
      cy.getByDataTest("password-msg").should("exist");
    });

    it("should successfully login and redirect to home", () => {
      cy.intercept("POST", apiURL("/auth/signin"), {
        fixture: "auth/login/successfulRes.json",
        statusCode: 201,
      }).as("signinRequest");
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/emptyContactListRes.json",
      }).as("contactsRequest");
      cy.getByDataTest("email-input").type(testUser.email);
      cy.getByDataTest("password-input").type(testUser.password);

      cy.getByDataTest("submit-button").click();

      cy.wait("@signinRequest").its("response.statusCode").should("eq", 201);
      cy.location("pathname").should("eq", "/");
    });

    it("should show error for invalid credentials", () => {
      cy.visit("/login");
      cy.intercept("POST", apiURL("/auth/signin"), {
        fixture: "auth/login/invalidCredsRes.json",
        statusCode: 400,
      }).as("signinRequest");

      cy.getByDataTest("email-input").type("wrong-email@gmail.com");
      cy.getByDataTest("password-input").type(testUser.password);

      cy.getByDataTest("submit-button").click();

      cy.wait("@signinRequest");

      cy.fixture("auth/login/invalidCredsRes.json").then((data) => {
        cy.contains(data.message).should("be.visible");
      });
    });
  });

  describe("Refresh Token Flow", () => {
    it("should refresh token on 401 request", () => {
      let initialIdToken = "";
      cy.fixture("auth/login/successfulRes.json").then((data) => {
        initialIdToken = data.idToken;
      });
      cy.intercept("GET", apiURL("/contacts"), (req) => {
        const authHeader =
          req.headers["authorization"] || req.headers["Authorization"];

        if (authHeader === `Bearer ${initialIdToken}`) {
          req.reply({
            fixture: "auth/unauthorizedRes.json",
            statusCode: 401,
          });
        } else {
          req.reply({
            fixture: "contacts/emptyContactListRes.json",
            statusCode: 200,
          });
        }
      }).as("contactsRequest");
      cy.intercept("POST", apiURL("/auth/refresh-token"), {
        fixture: "auth/refresh-token/successfulRes.json",
      }).as("refreshTokenRequest");

      cy.login(testUser);

      cy.wait(["@contactsRequest", "@refreshTokenRequest"]);
      cy.location("pathname").should("eq", "/");
    });

    it("should logout if refresh token is invalid", () => {
      cy.intercept("POST", apiURL("/auth/refresh-token"), {
        fixture: "auth/refresh-token/invalidRefreshTokenRes.json",
        statusCode: 400,
      }).as("refreshTokenRequest");
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "auth/unauthorizedRes.json",
        statusCode: 401,
      }).as("contactsRequest");

      cy.reload();

      cy.login(testUser);
      cy.wait(["@refreshTokenRequest", "@contactsRequest"]);
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("Logout Flow", () => {
    beforeEach(() => {
      cy.login(testUser);
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/emptyContactListRes.json",
      }).as("contactsRequest");
    });

    it("should successfully logout", () => {
      cy.logout();
    });
  });

  describe("Protected Routes", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    });

    it("should redirect to login when accessing protected route", () => {
      cy.visit("/contact");
      cy.url().should("include", "/login");
    });

    it("should maintain authentication after refresh", () => {
      cy.login(testUser);
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/emptyContactListRes.json",
      }).as("contactsRequest");

      cy.reload();

      cy.location("pathname").should("eq", "/");
    });
  });
});
