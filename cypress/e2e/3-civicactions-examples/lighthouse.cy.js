/// <reference types="cypress" />

// Docs and reference: https://mfrachet.github.io/cypress-audit/guides/lighthouse/command-api.html
context('Lighthouse Tests', () => {
  const CASite = 'https://civicactions.com/';

  it('should have a good lighthouse score for default metrics', () => {
    cy.visit(CASite);
    // All of these metrics are reported in a scale from 0 to 100.
    cy.lighthouse({
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
      pwa: 90,
    });
  });

  it('should have a good score for first meaningful paint, first CPU idle, and time to interactive.', () => {
    cy.visit(CASite);
    // All of these metrics are reported in milliseconds.
    cy.lighthouse({
      'first-meaningful-paint': 1000,
      'first-cpu-idle': 1000,
      interactive: 1000,
    });
  });
});
