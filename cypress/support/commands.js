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
  return cy.session(
    user,
    () => {
      cy.request({
        method: 'POST',
        url: '/user/login',
        form: true,
        body: {
          name: user,
          pass: password,
          form_id: 'user_login_form',
        },
      })
    },
    {
      // validate() {
      //   cy.visit('/user_profile');
      //   cy.contains(`Hello ${name}`);
      // },
      cacheAcrossSpecs: true,
    }
  )
})

Cypress.Commands.add('logout', () => {
  return cy
    .request({
      url: '/user/logout',
      failOnStatusCode: false,
    })
    .then(() => {
      Cypress.session.clearAllSavedSessions()
    })
})

// Taken from https://stackoverflow.com/a/56451395.
Cypress.Commands.add('waitForBrowser', () => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => win['requestIdleCallback'](resolve))
  })
})

/**
 * Taken from https://medium.com/appear-here-product-engineering/testing-iframes-with-cypress-including-stripe-and-hellosign-fed90d639870
 *
 * Will check if an iframe is ready for DOM manipulation. Just listening for the
 * load event will only work if the iframe is not already loaded. If so, it is
 * necessary to observe the readyState. The issue here is that Chrome initialises
 * iframes with "about:blank" and sets their readyState to complete. So it is
 * also necessary to check if it's the readyState of the correct target document.
 *
 * Some hints taken and adapted from:
 * https://stackoverflow.com/questions/17158932/how-to-detect-when-an-iframe-has-already-been-loaded/36155560
 *
 * @param $iframe - The iframe element
 */
const isIframeLoaded = ($iframe) => {
  const contentWindow = $iframe.contentWindow

  const src = $iframe.attributes.src
  const href = contentWindow.location.href
  if (contentWindow.document.readyState === 'complete') {
    return href !== 'about:blank' || src === 'about:blank' || src === ''
  }

  return false
}

/**
 * Wait for iframe to load, and call callback
 *
 * Some hints taken and adapted from:
 * https://gitlab.com/kgroat/cypress-iframe/-/blob/master/src/index.ts
 */
Cypress.Commands.add(
  'iframe',
  { prevSubject: 'element' },
  ($iframes) =>
    new Cypress.Promise((resolve) => {
      const loaded = []

      $iframes.each((_, $iframe) => {
        loaded.push(
          new Promise((subResolve) => {
            if (isIframeLoaded($iframe)) {
              subResolve($iframe.contentDocument.body)
            } else {
              Cypress.$($iframe).on('load.appearHere', () => {
                if (isIframeLoaded($iframe)) {
                  subResolve($iframe.contentDocument.body)
                  Cypress.$($iframe).off('load.appearHere')
                }
              })
            }
          })
        )
      })

      return Promise.all(loaded).then(resolve)
    })
)
