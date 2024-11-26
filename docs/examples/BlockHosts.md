# Blocking Hosts in Tests

The most common host you want to block in the tests in Google Analytics. To do that use the [`blockHosts`](https://docs.cypress.io/app/references/configuration#blockHosts) configuration option. Here is an example of a list of hosts we block including Google Analytics:

```javascript
  blockHosts: [
    '*doubleclick.net',
    '*google-analytics.com',
    '*tealiumiq.com',
    '*quantummetric.com',
    'g*qualtrics.com',
    '*nr-data.net',
    '*youtube.com',
    '*tiqcdn.com',
    '*touchpoints.app.cloud.gov',
    '*script.crazyegg.com',
    '*googletagmanager.com',
    '*googleapis.com'
  ],
```

While the hosts are blocked you still might see fetch/xhr requests in the Cypress logs/screenshots/videos. To hide those add the following to the `cypress/support/e2e.js` file:

```javascript
// Hide fetch/XHR requests
const cypressLogOriginal = Cypress.log
const cypressLogDomainsHidden = ['https://www.google-analytics.com']
Cypress.log = function (opts, ...other) {
  const logFetchIs = ['fetch'].includes(opts.displayName)
  const logFetchDomainMatch =
    logFetchIs && cypressLogDomainsHidden.find((d) => opts.url.includes(d))
  if (logFetchDomainMatch) return

  return cypressLogOriginal(opts, ...other)
}
```

[Credit for the code snippet](https://gist.github.com/simenbrekken/3d2248f9e50c1143bf9dbe02e67f5399?permalink_comment_id=4190114#gistcomment-4190114).

## Useful references

- https://docs.cypress.io/app/references/configuration#blockHosts
- https://gist.github.com/simenbrekken/3d2248f9e50c1143bf9dbe02e67f5399?permalink_comment_id=4190114#gistcomment-4190114
