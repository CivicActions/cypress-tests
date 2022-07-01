# Some Cypress plugins we use

* [cypress-axe](https://github.com/component-driven/cypress-axe): Test accessibility with [axe-core](https://github.com/dequelabs/axe-core) in Cypress. See also [examples/AccessibilityTesting.md](/examples/AccessibilityTesting.md).
* [cypress-testing-library](https://github.com/testing-library/cypress-testing-library): This allows you to use all the useful [DOM Testing Library](https://github.com/testing-library/cypress-testing-library) methods in your tests.

## Docker

Plugins can be added to the [docker image](https://github.com/drydockcloud/ci-cypress) but require `yarn` and `--cwd` parameter. Here is an example Dockerfile:

```yaml
FROM drydockcloud/ci-cypress:6.7.0
# Install Cypress plugins
RUN yarn add --cwd ../ axe-core cypress-axe
RUN yarn add --cwd ../ @testing-library/cypress
```

See also [Docker](Docker.md).

**Note**: In the [9.7.0 release](https://github.com/drydockcloud/ci-cypress/releases/tag/9.7.0) we added the plugins to the drydockcloud/ci-cypress image so that can be used directly.

## Useful references

* https://github.com/component-driven/cypress-axe
* https://timdeschryver.dev/blog/setting-up-cypress-with-axe-for-accessibility
