/// <reference types="cypress" />
import 'cypress-real-events/support'

describe('CKEditor tests', () => {
  beforeEach(() => {
    Cypress.config('baseUrl', 'http://drupal.ddev.site')
  })

  it('Logs in and create a page with normal text', () => {
    const title = 'CKEditor Test 1'
    const text = 'This is normal text.'

    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go to create page form.
    cy.visit('/node/add/page')

    // Enter test in title.
    cy.get('input[name="title[0][value]"]').type(title)

    // Focus on ckeditor window. Use clear to set the cursor at the beginning.
    cy.get('.ck-content').focus().clear()

    // Type some text.
    cy.realType(text, {})

    // Save page.
    cy.get('#edit-submit').click()

    // View page and confirm the title text.
    cy.get('h1.page-title').contains(title)

    // View page and confirm the body normal text.
    cy.get('.field--name-body p').contains(text)

    // Log out from being an administrator.
    cy.logout()
  })

  it('Logs in and create a page with bold text', () => {
    const title = 'CKEditor Test 2'
    const text = 'This is bold text.'

    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go to create page form.
    cy.visit('/node/add/page')

    // Enter test in title.
    cy.get('input[name="title[0][value]"]').type(title)

    // Focus on ckeditor window. Use clear to set the cursor at the beginning.
    cy.get('.ck-content').focus().clear()

    // Type some text.
    cy.realType(text, {})

    // Select all text, from https://docs.cypress.io/api/commands/type#Arguments.
    cy.get('.ck-content').type('{selectall}')

    // Click bold button.
    cy.get('[data-cke-tooltip-text*="Bold"]').click()

    // Save page.
    cy.get('#edit-submit').click()

    // View page and confirm the title text.
    cy.get('h1.page-title').contains(title)

    // View page and confirm the body bold text.
    cy.get('.field--name-body p strong').contains(text)

    // Log out from being an administrator.
    cy.logout()
  })

  it('Logs in and create a page with a YouTube video', () => {
    const title = 'CKEditor Test 3'

    // Log in as an administrator.
    cy.login('admin', 'admin')

    // Go to create page form.
    cy.visit('/node/add/page')

    // Enter test in title.
    cy.get('input[name="title[0][value]"]').type(title)

    // Select full HTML body format.
    cy.get('select[name="body[0][format]"]').select('Full HTML')

    // Click show more items button.
    cy.get('[data-cke-tooltip-text="Show more items"]').click()

    // Click insert media button.
    cy.get('[data-cke-tooltip-text="Insert Media"]').click()

    // Click remote video menu item.
    cy.get('.media-library-menu__item a[data-title="Remote video"]').click()

    // Enter YouTube URL in the field.
    cy.get('input[name="url"]').type(
      'https://www.youtube.com/watch?v=ck6QG9ME2aU'
    )

    // Click button to add video.
    cy.get('input[value="Add"]').click()

    // Click save button.
    cy.get('button').contains('Save').click()

    // Click insert selected button.
    cy.get('button').contains('Insert selected').click()

    // Intercept Drupal media.
    cy.intercept('/media/full_html/preview*').as('drupalMedia')

    // Wait for Drupal media.
    cy.wait('@drupalMedia')

    // Save page.
    cy.get('#edit-submit').click()

    // View page and confirm the title text.
    cy.get('h1.page-title').contains(title)

    // View page and confirm the iframe exists.
    cy.get('.field--name-body iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')

    // Log out from being an administrator.
    cy.logout()
  })
})
