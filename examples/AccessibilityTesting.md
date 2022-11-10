# Testing for Accessibility

We can test for accessibility issues with [axe-core](https://github.com/dequelabs/axe-core) in Cypress using [cypress-axe](https://github.com/component-driven/cypress-axe).

Here an example of functions you can add to `commands.js` to test accessibility with different window sizes and log them in a table:

```javascript
// Logs a11y violations, taken from https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument.
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

// Check for accessibility issues with different window sizes.
// Taken from https://timdeschryver.dev/blog/setting-up-cypress-with-axe-for-accessibility.
Cypress.Commands.add('checkA11yWithMultipleViewPorts', () => {
  cy.injectAxe();
  ;[
    [1920, 1080],
    'macbook-15',
    'macbook-13',
    'macbook-11',
    'iphone-6',
    'iphone-6+',
    'ipad-mini',
  ].forEach(size => {
    if (Array.isArray(size)) {
      cy.viewport(size[0], size[1])
    } else {
      cy.viewport(size)
    }
    cy.checkA11y(null, null, terminalLog)
  });
})
```

## Loading a sitemap and testing all pages

Credit to [@thejuliekramer](https://github.com/thejuliekramer) for figuring this out. Use the [x2js](https://www.npmjs.com/package/x2js) package to load all URLs from the sitemap.

```javascript
import "x2js";

const X2JS = require("x2js");

Cypress.Commands.add("getSitemapLocations", () => {
  return fetch("/sitemap.xml")
    .then((res) => res.text())
    .then((xml) => {
      const x2js = new X2JS();
      const json = x2js.xml2js(xml);
      // formatting the array of urls and last modified dates as ["https://lincs.ed.gov/", "2019-04-08T14:34Z"]
      const urls = json.urlset.url.map((url) => [url.loc, url.lastmod]);
      return urls;
    });
});
```

Use that custom command to check all pages for accessibility issues and do so only after set number of days since last modified. The following is the `cypress.config.js` file contents:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    includedImpacts: ["minor", "moderate", "serious", "critical"],
    daysSinceLastModified: 30,
    // Pages that should not be tested bc they redirect, etc. 
    // @TODO: Find a way to do this more elegantly than listing in the config.
    disallowedList: ["node/12"]
  },
});
```

Here is the accessibility test spec:

```javascript
describe("Accessibility is honored", () => {
  it("on every page", () => {
    let timeframe = Cypress.env("daysSinceLastModified");
    cy.getSitemapLocations().then((pages) => {
      
      // Format of pages is ["https://lincs.ed.gov/", "2019-04-08T14:34Z"].
      pages.forEach((page) => {
        cy.task("log", `url: ${page[0]} lastmod: ${page[1]}`);
        
        // Strip the full page down to the path so we can match against disallowed list.
        let path = page[0].replace(Cypress.config("baseUrl") + '/', '');

        cy.isWithinTimeframe(page[1], timeframe).then((withinTimeframe) => {
          
          // Ensure the page has been changed in the timeframe and the page is not external.
          if (withinTimeframe && page[0].includes(Cypress.config("baseUrl")) 
            && !Cypress.env("disallowedList").includes(path)) {
              
            cy.visit(page[0], { failOnStatusCode: false });

            cy.injectAxe();
            cy.checkA11y(
              null,
              {
                includedImpacts: Cypress.env("includedImpacts"),
              },
              cy.terminalLog,
              true
            );
          }
        });
      });
    });
  });
});
```

## Useful references

* https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument
* https://timdeschryver.dev/blog/setting-up-cypress-with-axe-for-accessibility
