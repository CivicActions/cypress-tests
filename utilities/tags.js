/*
 * Cucumber-like tag filter based on https://www.testingwithmarie.com/post/using-tags-to-filter-your-cypress-tests.
 */

let tags = (definedTags) => {
  // Test if any of the definedTags passed match any in the Cypress env.
  const testTags = (fn) => {
    if (Cypress.env('tags')) {
      // We split on space, as there's a bug with Cypress and commas.
      const envTags = Cypress.env('tags').split(' ')
      const isFound = definedTags.some((definedTag) =>
        envTags.includes(definedTag)
      )

      // If we have a tag match, run the passed function.
      if (isFound) {
        return fn
      } else {
        // Else run an empty function.
        return () => {}
      }
    } else {
      // If we don't have any tags set, run everything as normal.
      return fn
    }
  }

  // Wrap Cypress functions in our function that checks for tags.
  return {
    it: testTags(it),
    describe: testTags(describe),
    context: testTags(context),
  }
}

export default tags
