import { apiURL } from "../utils/back";

describe("Contacts", () => {
  const testUser = {
    email: "test@example.com",
    password: "12345678",
  };

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  describe("Create contacts", () => {
    beforeEach(() => {
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/emptyContactListRes.json",
        statusCode: 200,
      }).as("getContacts");
      cy.login(testUser);
      cy.wait("@getContacts");
    });

    it("should show validation errors for empty form submission", () => {
      cy.visit("/contact");
      cy.getByDataTest("username-msg").should("not.exist");
      cy.getByDataTest("fullname-msg").should("not.exist");
      cy.getByDataTest("phone-msg").should("not.exist");
      cy.getByDataTest("email-msg").should("not.exist");

      cy.getByDataTest("submit").click();

      cy.getByDataTest("username-msg").should("exist");
      cy.getByDataTest("fullname-msg").should("exist");
      cy.getByDataTest("phone-msg").should("exist");
      cy.getByDataTest("email-msg").should("exist");
    });

    it("should successfully create account and redirect to homepage", () => {
      cy.intercept("POST", apiURL("/contacts"), {
        fixture: "contacts/create/createContactRes.json",
      }).as("createContacts");
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/contactListWithOneContactRes.json",
      }).as("getUpdatedContacts");
      cy.visit("/contact");
      cy.fixture("contacts/create/newContactPayload.json").then((contact) => {
        cy.getByDataTest("username-input").type(contact.username);
        cy.getByDataTest("fullname-input").type(contact.fullName);
        cy.getByDataTest("phone-input").type(contact.phoneNumber);
        cy.getByDataTest("email-input").type(contact.email);

        cy.getByDataTest("submit").click();

        cy.wait("@createContacts");
        cy.location("pathname").should("eq", "/");
        cy.wait("@getUpdatedContacts");
        cy.contains(contact.username).should("be.visible");
        cy.contains(contact.email).should("be.visible");
      });
    });
  });

  describe("Update contacts", () => {
    beforeEach(() => {
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/contactListWithOneContactRes.json",
      }).as("getContacts");
      cy.login(testUser);
      cy.wait("@getContacts");
    });

    it("should successfully update contact", () => {
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/updatedContactListWithOneContactRes.json",
      }).as("getUpdatedContacts");
      cy.intercept("GET", apiURL("/contacts/*"), {
        fixture: "contacts/update/initialContact.json",
      }).as("getContactDetail");
      cy.intercept("PUT", apiURL("/contacts/*"), {
        fixture: "contacts/update/updateContactRes.json",
      }).as("udpateContact");
      cy.getByDataTest("edit-contact").click();
      cy.wait("@getContactDetail");
      cy.fixture("contacts/update/updateContactPayload.json").then(
        (contact) => {
          cy.getByDataTest("phone-input").clear().type(contact.phoneNumber);
          cy.getByDataTest("email-input").clear().type(contact.email);

          cy.getByDataTest("submit").click();

          cy.wait("@udpateContact");
          cy.location("pathname").should("eq", "/");
          cy.wait("@getUpdatedContacts");
          cy.contains(contact.phoneNumber).should("be.visible");
          cy.contains(contact.email).should("be.visible");
        },
      );
    });
  });

  describe("Delete contacts", () => {
    beforeEach(() => {
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/contactListWithOneContactRes.json",
      }).as("getContacts");
      cy.login(testUser);
      cy.wait("@getContacts");
    });

    it("should delete contact", () => {
      cy.intercept("GET", apiURL("/contacts"), {
        fixture: "contacts/emptyContactListRes.json",
        statusCode: 200,
      }).as("getUpdatedContacts");
      cy.intercept("DELETE", apiURL("/contacts/*"), {
        statusCode: 204,
      }).as("deleteContact");

      cy.getByDataTest("delete-contact").click();

      cy.getByDataTest("delete-contact-confirmation").click();
      cy.wait(["@deleteContact", "@getUpdatedContacts"]);
      cy.getByDataTest("contact-item").should("not.exist");
    });
  });
});
