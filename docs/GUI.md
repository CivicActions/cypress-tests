# GUI (aka interactive mode)

Cypress provides an interactive mode that makes it easier to troubleshoot your tests. This can be done with [Docker and X11](Docker.md) or installing Cypress locally using npm/yarn.

## Local installation

After installing Cypress via yarn/npm following https://docs.cypress.io/guides/getting-started/installing-cypress#Installing here are some different ways of tackling the tests.

### In the same repo and the main project

The [CA accessibility site](https://github.com/CivicActions/accessibility) has Cypress tests testing for accessibility and the tests can be run in the repo using command line or the GUI.

See also [Plugins](Plugins.md).

### In the same repo but with different project path and json file

Use a command below after installing the dependencies.

```
yarn run cypress open --project ./tests/cypress --config-file cypress.external.json
```

> I think people using the local UI for test development is fine, personally - it's helpful to have the container be able to run locally though, so that people not working on tests (or debugging issues where tests fail in CI but pass in the UI) can run them conveniently - [Owen Barton](https://github.com/grugnog)

## Useful references

- https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/#Interactive-mode
