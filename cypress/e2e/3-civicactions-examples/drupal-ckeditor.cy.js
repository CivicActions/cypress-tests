/// <reference types="cypress" />
describe('CKEditor tests', () => {
  beforeEach(() => {
    Cypress.config('baseUrl', 'http://drupal.ddev.site')
  })

  it('Logs in and create a page with normal text', () => {
    const title = 'CKEditor Test 1'

    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go to create page form.
    cy.visit('/node/add/page')

    // Enter test in title.
    cy.get('input[name="title[0][value]"]').type(title)

    // Enter normal text in body, from https://github.com/cypress-io/cypress/issues/26155.
    cy.get('.ck-content[contenteditable=true]').then((el) => {
      const editor = el[0].ckeditorInstance
      editor.setData('This is normal text.')
    })

    // Save page.
    cy.get('#edit-submit').click()

    // View page and confirm the title text.
    cy.get('h1.page-title').contains(title)

    // View page and confirm the body normal text.
    cy.get('.field--name-body p').contains('This is normal text.')

    // Log out from being an administrator.
    cy.logout()
  })

  it('Logs in and create a page with bold text', () => {
    const title = 'CKEditor Test 2'

    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go to create page form.
    cy.visit('/node/add/page')

    // Enter test in title.
    cy.get('input[name="title[0][value]"]').type(title)

    // Enter normal text in body, from https://github.com/cypress-io/cypress/issues/26155.
    cy.get('.ck-content[contenteditable=true]').then((el) => {
      const editor = el[0].ckeditorInstance
      editor.setData('This is bold text.')
    })

    // Select all text, from https://docs.cypress.io/api/commands/type#Arguments.
    cy.get('.ck-content').type('{selectall}')

    // Click bold button.
    cy.get('[data-cke-tooltip-text="Bold (⌘B)"]').click()

    // Save page.
    cy.get('#edit-submit').click()

    // View page and confirm the title text.
    cy.get('h1.page-title').contains(title)

    // View page and confirm the body bold text.
    cy.get('.field--name-body p strong').contains('This is bold text.')

    // Log out from being an administrator.
    cy.logout()
  })
})
