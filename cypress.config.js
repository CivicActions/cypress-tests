const { defineConfig } = require('cypress')
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/junit.[hash].xml',
  },
  e2e: {
    baseUrl: 'https://cypress-tests.ddev.site',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        lighthouse: lighthouse(),
      })
    },
  },
})
