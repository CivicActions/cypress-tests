# Test single-sign on authentication

We use the example in a smoke test on a staging site. This example has to deal with our staging site having basic authentication on top of regular authentication. Before the test we have already logged into the stage site. We use `request` and `then` to stop the redirect, get the redirect URL, visit it (passing basic auth) and then confirming we have been redirected to the site we started with.

```javascript
    // Are we logged into the main site?
    it('User can view main home page', () => {
      cy.request({
        url: mainSiteLoginUrl,
        followRedirect: false
      }).then((resp) => {
        cy.visit(resp.redirectedToUrl, { auth: { username: 'username', password: 'password' } })
          .get('title')
            .should('contain', 'GlobalNET LMS');
      });
    });
```

## Useful references

* https://docs.cypress.io/api/commands/request#Options
