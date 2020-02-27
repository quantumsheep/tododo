# Tododo
Todo list using TDD, including CI and CD configurations - Ready for Docker and Heroku

# Versioning
We are using `Feature Branch + Merge Requests` git workflow which means that feature branches will be used for each new functionality and that it needs a merge request that will be reviewed for it to be pushed into `master`.

[Karma's git commit message convention](https://karma-runner.github.io/4.0/dev/git-commit-msg.html) is what we use to name our commits.

# Application functionalities
Tododo lets you create todo-lists for tasks tracking and management.

On the technique side it uses React for the front-end and Node for the back-end (also called API here).

Tests are made with Jest and done automatically on Pull Requests.

# Contribute
A specific environment has been made to ease the development of the application. It can be launched using `docker-compose` command from [Docker's CLI](https://www.docker.com/).

```bash
docker-compose build
docker-compose up
```

It will use local `client` and `server` files and automatically takes code changes.

# Deployment
Every methods bellow needs to have a clone of this repository on the server Tododo is meant to be installed.

## Using `docker-compose`
For production we use a specific configuration of `docker-compose` but it's still very similar to the development environment.

```bash
docker-compose build
docker-compose -f docker-compose.yml -f production.yml up -d
```

The `production.yml` file contains the production's configuration differences compared to `docker-compose.yml`.

## Using a Docker image
To get the image you'll need to build it with `docker build`:
```bash
docker build -t tododo .
```

Then run it like a regular container:
```bash
docker run -p 3000:3000 --name tododo -d tododo
```

It will need to access a MongoDB server from the port `27017`, you can provide it by changing the newly created container to a specific network if you have a MongoDB container. You can also create your own `docker-compose.yml` configuration that match your needs.

# Tests
We are using Continuous Integration service [Travis CI](https://travis-ci.org/) to automatically run our tests when creating a Pull Request.

## Server
Server-side tests are done by running `npm test` in the `server` directory. Those are made in the `server/tests` directory.
