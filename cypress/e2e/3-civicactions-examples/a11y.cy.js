/// <reference types="cypress" />
import 'cypress-axe'
import 'x2js'

const X2JS = require('x2js')
const path = require('path')
const url = require('url')

context('CA home site accessibility', () => {
  const casite = 'https://civicactions.com/'

  it('homesite should have one accessible failure', () => {
    cy.visit(casite)
    cy.injectAxe()
    // View example failure in the GUI.
    cy.checkA11y(null, null, null, true)
  })
})

context('CA a11y site accessibility', () => {
  const a11ysite = 'https://accessibility.civicactions.com/'

  beforeEach(() => {
    cy.visit(a11ysite)
  })

  it('a11y site should be accessible with default axe options', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  // Logs a11y violations, taken from https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument.
  function terminalLog(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`,
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
      }),
    )

    cy.task('table', violationData)
  }

  // Check for accessibility issues with different window sizes.
  // Taken from https://timdeschryver.dev/blog/setting-up-cypress-with-axe-for-accessibility.
  Cypress.Commands.add('checkA11yWithMultipleViewPorts', () => {
    cy.injectAxe()
    ;[
      [1920, 1080],
      'macbook-15',
      'macbook-13',
      'macbook-11',
      'iphone-6',
      'iphone-6+',
      'ipad-mini',
    ].forEach((size) => {
      if (Array.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.checkA11y(null, null, terminalLog)
    })
  })

  it('a11y site should be accessible in multiple view ports', () => {
    cy.injectAxe()
    cy.checkA11yWithMultipleViewPorts()
  })

  // Credit to @thejuliekramer for figuring out working with sitemaps
  Cypress.Commands.add('getSitemapLocations', () => {
    return fetch('/sitemap.xml')
      .then((res) => res.text())
      .then((xml) => {
        const x2js = new X2JS()
        const json = x2js.xml2js(xml)
        // formatting the array of urls and last modified dates as ["https://lincs.ed.gov/", "2019-04-08T14:34Z"]
        return json.urlset.url.map((url) => [url.loc, url.lastmod])
      })
  })

  Cypress.Commands.add('isWithinTimeframe', (lastmod, timeframe) => {
    const now = new Date()
    if (lastmod != 'undefined') {
      var lastmod = lastmod
    } else {
      var lastmod = null
    }
    const then = new Date(lastmod)
    const msBetweenDates = Math.abs(then.getTime() - now.getTime())
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000)
    return cy.wrap(daysBetweenDates < timeframe)
  })

  describe('Accessibility is honored', () => {
    it('on every page of the a11y site', () => {
      let timeframe = 30
      cy.getSitemapLocations().then((pages) => {
        // Format of pages is ["https://lincs.ed.gov/", "2019-04-08T14:34Z"].
        pages.forEach((page) => {
          cy.isWithinTimeframe(page[1], timeframe).then((withinTimeframe) => {
            // Ensure the page has been changed in the timeframe and the pages are not external or PDFs.
            if (
              withinTimeframe &&
              (() => {
                const parsedUrl = url.parse(page[0])
                const host = parsedUrl.host
                const allowedHosts = [
                  'accessibility.civicactions.com',
                ]
                return allowedHosts.includes(host)
              })() &&
              path.extname(page[0]) !== '.pdf'
            ) {
              cy.visit(page[0], { failOnStatusCode: false })

              cy.injectAxe()
              cy.checkA11y(
                null,
                {
                  includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
                },
                cy.terminalLog,
                true,
              )
            }
          })
        })
      })
    })
  })
})
