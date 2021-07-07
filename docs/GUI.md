# GUI (aka interactive mode)

Cypress provides an interactive mode that makes it easier to troubleshoot your tests. This can be done with [Docker and X11](Docker.md) or installing Cypress locally using npm/yarn.

## Local installation

After installing Cypress via yarn/npm following https://docs.cypress.io/guides/getting-started/installing-cypress#Installing here are some different ways of tackling the tests.

### In the same repo and the main project

The [CA accessibility site](https://github.com/CivicActions/accessibility) has Cypress tests testing for accessibility and the tests can be run in the repo using command line or the GUI.

See also [Plugins](Plugins.md).

### Symlinks

You can install the Cypress outside the main project and symlink the files from the main repo to run the tests with the GUI. Symlinking ensures the tests are in the same place where it is run by the pipeline and avoid having the additional dependencies in the project repo. Here are example steps that were used for a project:

1. Move some files so that we can rollback later.
```bash
mkdir archive
mv cypress archive/
```
2. Symlink to your Cypress data.
```bash
ln -s ~/path/to/project-repo/tests/cypress/cypress cypress
ln -s ~/path/to/project-repo/tests/cypress/cypress.env.json cypress.env.json
ln -s ~/path/to/project-repo/tests/cypress/cypress.external.json cypress.json
ln -s ~/path/to/project-repo/tests/cypress/integration integration
ln -s ~/path/to/project-repo/tests/cypress/support support
```

> I think people using the local UI for test development is fine, personally - it's helpful to have the container be able to run locally though, so that people not working on tests (or debugging issues where tests fail in CI but pass in the UI) can run them conveniently - [Owen Barton](https://github.com/grugnog)

## Useful references

* https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/#Interactive-mode
