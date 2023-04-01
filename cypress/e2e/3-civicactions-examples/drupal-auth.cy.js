/// <reference types="cypress" />
describe('Authentication tests', () => {
  beforeEach(() => {
    Cypress.config('baseUrl', 'http://drupal.ddev.site')
  })

  it('logs in without custom command', function () {
    cy.visit('/user/login')
    cy.get('#edit-name').type('admin')
    cy.get('#edit-pass').type('admin')
    cy.get('input[value="Log in"]').scrollIntoView().click()

    cy.visit('/admin/content')
    cy.get('h1.page-title').contains('Content')
  })

  it('Logs in and out as an administrator', () => {
    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go visit a page that requires authentication.
    cy.visit('/admin/content')

    // Confirm the page loads instead of 404.
    cy.get('h1.page-title').contains('Content')

    // Go visit a page that requires more authentication.
    cy.visit('/admin/config/system/site-information')

    // Confirm the page loads instead of 404.
    cy.get('h1.page-title').contains('Basic site settings')

    // Log out from being an administrator.
    cy.logout()

    // Go visit a page that requires authentication.
    cy.visit('/admin/content', { failOnStatusCode: false })

    // Confirm the page loads 403.
    cy.get('h1.page-title').contains('Access denied')
  })
})
