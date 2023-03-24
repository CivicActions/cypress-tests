# Cypress Tests

The purpose of this repo is to archive and be able to retrieve cypress test recipes and documentation created/contributed by CivicActions staff.

## Quickstart

There's a lot to the documentation and examples sections of this repository; however, to get started quickly, you
can run the following commands:

    ```bash
    # Install dependencies.
    npm install

    # Run the Cypress example suite tests.
    npm run cy:run:examples

    # Run the CivicActions example suite tests.
    npm run cy:run:ca-examples

    # Open the Cypress GUI to run e2e tests with the electron browser.
    npm run cy:open --e2e --browser electron
    ```

## Docs

You should start by reading the "Getting Started" documentation section that will orient you to Cypress and how
CivicActions uses it to test web applications.

- Available under [docs](/docs).

## Examples

If you are a seasoned Cypress user and are looking for concrete examples of how to do something, you can find them
in the examples section of documentation. We try to turn the examples into actual tests and link to the working
tests in the example documentation. We also include handy custom commands you can use in your own tests.

- Available under [examples](/docs/examples).
- Custom Cypress commands are available under [cypress/support/commands.js](/cypress/support/commands.js).
- Handy example tests from Cypress under [cypress/e2e/2-advanced-examples](/cypress/e2e/2-advanced-examples).
- CivicActions example tests under [cypress/e2e/3-civicactions-examples](/cypress/e2e/3-civicactions-examples).

## Contributing

We encourage you to contribute to this repository as you are working on your client and personal projects. It is
often the case that developers will add a new Cypress best practice to project work first, but not all of that
knowledge is known and shared outside the project.

For example, this issue https://github.com/CivicActions/cypress-tests/issues/8 was created because a developer
encountered uncaught exceptions causing a Cypress test to fail but wanted to ask what others thought the best
practice way to handle this was. The developer then created a PR to add an example to the repository that could
inform future developers that encounter the same issue on their projects.

Please see [CONTRIBUTING.md](/.github/contributing.md) for details on how to help grow this repository.

## Communications

- We use the #engineering-qa channel in the CivicActions Slack workspace to discuss Cypress and share knowledge. You
  can follow that channel to be informed of QA topics and updates to this repository.
- The [QA Practice Area](https://guidebook.civicactions.com/en/latest/practice-areas/about-practice-areas/) has a
  monthly meeting that anyone interested in QA is free to join. You can join the meeting by following updates in the
  #engineering-qa channel.
