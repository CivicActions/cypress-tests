// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@cypress-audit/lighthouse/commands'

Cypress.Commands.add('login', (user, password) => {
  return cy.session(user, () => {
      cy.request({
        method: 'POST',
        url: '/user/login',
        form: true,
        body: {
          name: user,
          pass: password,
          form_id: 'user_login_form'
        }
      });
    },
    {
      // validate() {
      //   cy.visit('/user_profile');
      //   cy.contains(`Hello ${name}`);
      // },
      cacheAcrossSpecs: true,
    });
});

Cypress.Commands.add('logout', () => {
  return cy.request({
    url: '/user/logout',
    failOnStatusCode: false
  }).then(() => {
    Cypress.session.clearAllSavedSessions();
  });
});
