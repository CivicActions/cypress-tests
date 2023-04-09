/// <reference types="cypress" />
describe('CKEditor tests', () => {
  beforeEach(() => {
    Cypress.config('baseUrl', 'http://drupal.ddev.site')
  })

  it('Logs in and create a page', () => {
    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go to create page form.
    cy.visit('/node/add/page')

    // Enter test in title.
    cy.get('input[name="title[0][value]"]').type('CKEditor Test 1')

    // Enter normal text in body, from https://github.com/cypress-io/cypress/issues/26155.
    cy.get('.ck-content[contenteditable=true]').then((el) => {
      const editor = el[0].ckeditorInstance
      editor.setData('This is normal text.\n')
    })

    // Save page.
    cy.get('#edit-submit').click()

    // View page and confirm the title text.
    cy.get('h1.page-title').contains('CKEditor Test 1')

    // View page and confirm the body normal text.
    cy.get('.field--name-body p').contains('This is normal text.')

    // Log out from being an administrator.
    cy.logout()
  })
})
