# Running Cypress Tests in Parallel

## Using Gitlab's parallel feature
One of the methods we have explored for running Cypress tests concurrently, is via the Parallel feature in gitlab. As we are not using [Cypress Dashboard](https://docs.cypress.io/guides/dashboard/introduction), we need to script the spec organization and test distribution.

The approach we have taken is via running a common script that queries the next set of specs to run as found in a pre-populated redis key. In this way each runner grabs the next available test until all the tests are complete.

Example .gitlab-ci.yml job for running cypress tests in parallel:
```
cypress_tests:
  stage: cypress_tests
  parallel: 5
  script:
    - ./bin/cypressRun.sh
```

Within the `cypressRun.sh` script, the engine that drives the process is the following while loop:

```
moreTests="TRUE"
while [ "$moreTests" = "TRUE" ]
do
  cypress_test=$(docker exec ${COMPOSE_PROJECT_NAME}_redis_1 redis-cli lpop cypresslist)

  if [[ $cypress_test == "" ]]
  then
    moreTests="FALSE"
  else
    echo "Run test group: ${cypress_test}"
    docker-compose run --rm cypress run -s integration/$cypress_test/*
  fi
done
```

From the above example, the key items are:

We grab the next test group from the redis key `cypresslist` which contains a list of the sub-directory names that hold our spec files:
```
cypress_test=$(docker exec ${COMPOSE_PROJECT_NAME}_redis_1 redis-cli lpop cypresslist)
```
And we use that variable reference to run the cypress tests under that sub-directory:
```
 docker-compose run --rm cypress run -s integration/$cypress_test/*
```
Also useful to note that we are deploying redis and cypress via containers to eliminate the need to install them locally.

### Difficulties encountered when running tests in parallel
One large assumption in the above approach is that strict test isolation must be used to prevent tests from stepping on each other.

For example, if a test verifies user deletion, that user should not be used in any other test as it will create a race condition in which the secondary test will pass/fail depending on if it runs before or after the deletion test runs. Trying to maintain test execution order or dependencies will increase the complexity of test management. Therefore, ensuring that tests are isolated is the best approach to provide the most flexibility in execution and help prevent fragile test runs.

Depending on the test target and/or test infrastructure, other opportunities exist to help with test isolation.

One such avenue we pursued is to use the [docker-compose up 'scale'](https://docs.docker.com/compose/reference/up/) option to scale up the number of instances we start for our services. This could provide test isolation via unique environments as opposed to isolation within the tests themselves. Using the same user deletion example as before, if that test runs against the first instance, while a second test using that user runs against a separate instance (and they do not share a DB), the tests would still in effect be isolated.

Example of starting up scaled instances in gitlab pipeline:
```
   - export SCALE=5
   - docker-compose up -d --scale db=${SCALE} --scale web=${SCALE}
```

With this approach, extra requirements are created for the `cypressRun.sh` script as each parallel runner will need to ensure that it is calling a different scaled instance in order to maintain the desired test isolation.

## Useful references

* https://docs.cypress.io/guides/guides/parallelization - **Note**: Requires using Cypress dashboard (cloud service).
* https://www.cypress.io/blog/2018/09/05/run-end-to-end-tests-on-ci-faster/
* https://testdriven.io/blog/running-cypress-tests-in-parallel/
* https://github.com/tnicola/cypress-parallel
* https://medium.com/trendyol-tech/running-cypress-tests-parallel-in-gitlab-pipeline-56b1fa4cb286
   * https://docs.gitlab.com/ee/ci/yaml/#parallel
   * https://about.gitlab.com/blog/2021/01/20/using-run-parallel-jobs/ 
