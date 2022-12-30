/// <reference types="cypress" />

// Docs and reference: https://mfrachet.github.io/cypress-audit/guides/pa11y/installation.html
context('Pa11y Tests', () => {
  const CASite = 'https://civicactions.com/';

  it.skip('should have no accessibility issues', () => {
    cy.visit(CASite);
    cy.pa11y({});

    // Breaks with...
    /*
    cy.task('pa11y') failed with the following error:
    Failed to fetch browser webSocket URL from http://localhost:53315/json/version:
    request to http://localhost:53315/json/version failed,
    reason: connect ECONNREFUSED ::1:53315
     */
  });
});
