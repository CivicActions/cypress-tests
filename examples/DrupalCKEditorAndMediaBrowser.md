# Test interacts with CKEditor and Media Browser

The below example test interacts WYSIWYG input on a Drupal node form page. Things to note:

* Use of `intercept` and `wait` for the Media Browser. This [combination is recommended over waiting an arbitary amount of time](https://docs.cypress.io/guides/references/best-practices#Unnecessary-wait-for-cy-get).
* Use of `waitForBrowser` custom function:
```javascript
// Taken from https://stackoverflow.com/a/56451395.
Cypress.Commands.add('waitForBrowser', () => {
  cy.window().then(win => {
    return new Cypress.Promise(resolve => win['requestIdleCallback'](resolve));
  });
});
```
* Use of the [`iframe`](/utilities/iframe.js) custom function.
* Use of [`wrap`](https://docs.cypress.io/api/commands/wrap) to interact with the iframe.

## Test code

```javascript
    it('YouTube video is added via media browser', () => {
      cy.intercept('GET', '/media/browser?*').as('mediaBrowserGET');
      cy.intercept('POST', '/media/browser?*').as('mediaBrowserPOST');
      const options = {
        path: '/node/add/post'
      };
      cy.visit(options.path);
      cy.waitForBrowser().then(() => {
        // Click the media browser button in ckeditor
        cy.get('#cke_23').click();
      }).then(() => {
        // Inside the media browser iframe.
        cy.wait('@mediaBrowserGET');
        cy.get('iframe#mediaBrowser')
          .should('be.visible')
          .iframe()
          .then(iframes => {
            cy.wrap(iframes[0]).find('#ui-id-2').should('have.text', 'Web').click();
            cy.wrap(iframes[0]).find('#media-internet-add-upload').should('include.text', 'YouTube');
            cy.wrap(iframes[0]).find('#edit-embed-code').type('https://www.youtube.com/watch?v=ck6QG9ME2aU');
            cy.wrap(iframes[0]).find('#media-internet-add-upload').submit();
          });
      });

      // Wait for error message.
      cy.wait('@mediaBrowserPOST');
      cy.get('iframe#mediaBrowser')
        .iframe()
        .then(iframes => {
          cy.wrap(iframes[0]).find('.messages.error').should('not.exist');
        });
    });
```

## Useful references

* https://docs.cypress.io/guides/references/best-practices#Unnecessary-wait-for-cy-get
* https://stackoverflow.com/questions/53428220/cypress-io-contains-not-waiting-for-element/56451395#56451395
* https://medium.com/appear-here-product-engineering/testing-iframes-with-cypress-including-stripe-and-hellosign-fed90d639870
* https://docs.cypress.io/api/commands/wrap
