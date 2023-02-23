# Test interacts with CKEditor and Media Browser

The below example test interacts WYSIWYG input on a Drupal node form page. Things to note:

- Use of `intercept` and `wait` for the Media Browser. This [combination is recommended over waiting an arbitary amount of time](https://docs.cypress.io/guides/references/best-practices#Unnecessary-wait-for-cy-get).
- Use of `waitForBrowser` custom function:

```javascript
// Taken from https://stackoverflow.com/a/56451395.
Cypress.Commands.add('waitForBrowser', () => {
  cy.window().then(win => {
    return new Cypress.Promise(resolve => win['requestIdleCallback'](resolve));
  });
});
```

- Use of the [`iframe`](/utilities/iframe.js) custom function.
- Use of [`wrap`](https://docs.cypress.io/api/commands/wrap) to interact with the iframe.
- CKEditor loads in the buttons but there are initially in a “disabled” state and then they become enabled. Cypress can clicks the button even though it is disabled, the click is acknowledged as valid but the media browser does not open. A solution I found is to check that `aria-disabled` is not true which I think provided enough time for button to be enabled and for the test to actually continue properly.

## Test code

```javascript
    it('YouTube video is added via media browser', () => {
      const options = {
        path: '/node/add/post'
      };

      // Track GET and POST of the media browser URL.
      cy.intercept('/media/browser?render=media-popup&id=media_wysiwyg&plugins=').as('mediaBrowserURL');

      cy.visit(options.path);
      cy.waitForBrowser().then(() => {
        cy.get('a[title="Media browser"]').should('have.attr', 'aria-disabled', 'false').click();
      }).then(() => {
        // Inside the media browser iframe.
        cy.wait('@mediaBrowserURL')
          .get('iframe#mediaBrowser')
          .iframe()
          .then(iframes => {
            cy.wrap(iframes[0]).find('a[title="Web"]').click();
            cy.wrap(iframes[0]).find(mediaAddUploadField).should('include.text', 'YouTube');
            cy.wrap(iframes[0]).find('#edit-embed-code').type('https://www.youtube.com/watch?v=ck6QG9ME2aU');
            cy.wrap(iframes[0]).find('#media-internet-add-upload').submit();
          });
      });

      // Wait for error message.
      cy.wait('@mediaBrowserURL')
        .get('iframe#mediaBrowser')
        .iframe()
        .then(iframes => {
          cy.wrap(iframes[0]).find('.messages.error').should('not.exist');
        });
    });
```

## Useful references

- https://docs.cypress.io/guides/references/best-practices#Unnecessary-wait-for-cy-get
- https://stackoverflow.com/questions/53428220/cypress-io-contains-not-waiting-for-element/56451395#56451395
- https://medium.com/appear-here-product-engineering/testing-iframes-with-cypress-including-stripe-and-hellosign-fed90d639870
- https://docs.cypress.io/api/commands/wrap
- https://stackoverflow.com/questions/72718185/cypress-disabled-button-is-somehow-clicked-anyway-without-waiting
