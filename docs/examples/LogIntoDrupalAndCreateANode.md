# Log into Drupal and Create a Node

From [Sam Lerner](https://github.com/synterra), "I made new Cypress commands in `support/commands.js` to do logging in", like:

```javascript
Cypress.Commands.add('login', function(username) {
  // The user/pass are set when the user is created
  // in docker/php/build.sh  return cy.request({
    method: 'POST',
    url: '/user/login',
    form: true,
    body: {
      // With no username argument use testuseradmin.
      name: (username ? username : "testuseradmin"),
      pass: 'password',
      form_id: 'user_login_form'
    }
  });
});
```

Use this to get the token:

```javascript
Cypress.Commands.add('getRestToken', (user, password) => {
  cy.login(user, password)
  return cy
    .request({
      method: 'GET',
      url: '/session/token',
    })
    .its('body')
})
```

Here's a snippet to create a node:

```javascript
Cypress.Commands.add('createNode', (token, nodeType, fields, relationships) => {
  return cy
    .request({
      method: 'POST',
      url: `/jsonapi/node/${nodeType}`,
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': token,
      },
      body: {
        data: {
          type: `node--${nodeType}`,
          attributes: fields,
          relationships: relationships,
        },
      },
    })
    .as('body')
})
```
