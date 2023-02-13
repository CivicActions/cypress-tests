# Lighthouse Audits

Site performance is increasingly important for developers to consider while building applications. Search engines
can dock your app for slow performance, and users can leave your site if it takes too long to load. Lighthouse is a
great tool to use for a quick check of your application's performance.

## Example

Let's say we want to do a quick check of the performance of our homepage to see how users will experience it from a
performance perspective. We can use the `lighthouse` command to do this. We can also set thresholds for each of the
audit categories to ensure that our app meets a minimum standard.

```javascript
it('Lighthouse audit', () => {
  cy.lighthouse({
    performance: 90,
    accessibility: 90,
    'best-practices': 90,
    seo: 90,
    pwa: 90,
  })
})
```

More details will come as we explore using the lighthouse plugin, but for now it is pretty basic.

## Useful references

You should read through the lighthouse audit documentation to get a better understanding of what the audits are all
about and the options available to you.

- API docs - https://mfrachet.github.io/cypress-audit/guides/lighthouse/api-intro.html
- Lighthouse docs - https://developers.google.com/web/tools/lighthouse
