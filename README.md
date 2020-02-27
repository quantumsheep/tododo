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
For production we use a specific configuration of `docker-compose` but it's still very similar to the development environment.

```bash
docker-compose build
docker-compose -f docker-compose.yml -f production.yml up -d
```

The `production.yml` file contains the production's configuration differences compared to `docker-compose.yml`.
