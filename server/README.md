# Loyalty Checkin
This NodeJS server was authored in the KOA framework.
It tracks user checkins and tallies points, while enforcing some simple
buisiness rules:
* A user must be first registered before tracking checkins.
* A new user should earn 50 points for their first checkin.  A returning user should only earn 20. 
* Upon successfully checking in a user should be shown how many times they’ve checked in and what their point total is.  
* A user should not be allowed to check in more than once every five minutes.  
* The user should be sent an email with the points total after each check-in.  

## Prerequisites
* Node.js (8+): recommend using [nvm](https://github.com/creationix/nvm)
* Docker (if building a docker image) https://www.docker.com/docker-mac

## Installation
First, clone this repo and `cd` into the main directory.  Then:
```shell
npm install
```

## Development
During development, the `/app` folder is being watched for changes.

All changes invoke the TypeScript compiler, which restarts the app upon completion.
```shell
npm run watch
```

## Build the Server
To compile the TypeScript code and place into the `/dist` folder:
```shell
npm build
```

## Code Linter
A TypeScript linter has been added to keep code consistent among developers.
```shell
npm run lint
```
To autofix linting errors (not all errors are auto-fixable):
```shell
npm run fix
```

## Tests and Coverage
The test coverage percentage should be 90% or greater for any submitted PRs.

For TDD, invoke continuous testing by:
```shell
npm test
```
For an html and text coverage report (html located in the `/coverage` folder):
```shell
npm run coverage
```

## Docker
To build a container using the `dockerfile`:
```shell
npm run image:build -- --no-cache
```

To run the server within the container:
```shell
npm run image:run -- start --
```

## Design Decisions
* I've never played with `KOA` before, so it was chosen as the node server framework.
* To get some degree of type safety and better editor autocomplete and insights, `typescript` was implemented.
* To keep things simple for the persistence layer, `sqlite` was added for file-based data persistence.
* I'm using ES6 imports/exports rather than Node's CommonJS module loader to have parity with my frontend coding style.
* I'm just using a fake smtp server, check out the console output to preview the email.

## Thoughts on Improvements
Because time was limited, there were many improvements I didn't implement.  These include:
* As the project grows, segment files into folders (e.g. routes, config, db, models, controllers ...etc).
* Implement knex + sequelize, create migrations for the tables and add some seed data.
* Add authentication and JWT token passing.
* Swaggerize the docblocks for the routes.
* Implement a .env file.
