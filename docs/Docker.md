# Cypress and Docker

We have a [Docker image available](https://github.com/drydockcloud/ci-cypress) that is build on top of the [Cypress Docker image](https://github.com/cypress-io/cypress-docker-images) and will run your Cypress tests locally and in CI pipelines.

> Using docker means folks don't have to install all the node stuff - [Sam Lerner](https://github.com/synterra)

## GUI

The Docker image above supports running the GUI (aka interactive mode) using X11. From https://github.com/drydockcloud/ci-cypress/blob/master/docker-compose.cypress.yaml:

```yaml
version: "3"

services:
  # Example docker-compose service for cypress:
  cypress:
    image: drydockcloud/ci-cypress:latest
    command: autotest
    volumes:
      - ./tests/cypress:/src
      - ./results/cypress:/results
    # Optional - uncomment following 3 lines to provide X11 access for interative use:
    #  - /tmp/.X11-unix:/tmp/.X11-unix
    #environment:
    #  - DISPLAY
    # To use the above, run the following before starting docker-compose:
    #  OS X:
    #   IP=$(ipconfig getifaddr en0)
    #   /usr/X11/bin/xhost + $IP
    #   DISPLAY=$IP:0
    #  GNU/Linux:
    #   xhost +local:
    depends_on:
      - web
```

See also [GUI](GUI.md).

## Useful references

* https://github.com/drydockcloud/ci-cypress
* https://github.com/bahmutov/demo-docker-cypress-included
* https://docs.cypress.io/examples/examples/docker
* https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/#Interactive-mode
