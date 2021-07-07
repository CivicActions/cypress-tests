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

## Useful references

* https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument
* https://timdeschryver.dev/blog/setting-up-cypress-with-axe-for-accessibility
