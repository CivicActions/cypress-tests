# Test Reporters

Cypress has builtin support for [JUnit reporting](https://docs.cypress.io/guides/tooling/reporters).

**Note**: from their [documentation](https://docs.cypress.io/guides/tooling/reporters#Reporter-Options)

> Each spec file is processed completely separately during each cypress run execution. Thus each spec run overwrites the previous report file. To preserve unique reports for each specfile, use the [hash] in the mochaFile filename.

```json
{
  "reporter": "junit",
  "reporterOptions": {
    "mochaFile": "results/my-test-output-[hash].xml"
  }
}
```

## Other reporters

- [Xunit Viewer](https://github.com/lukejpreston/xunit-viewer) that can take the generated XML files and produce a HTML report page.

## Useful references

- https://github.com/lukejpreston/xunit-viewer
- https://docs.cypress.io/guides/tooling/reporters
