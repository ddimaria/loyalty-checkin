# Client
This is an Angular 5 application.

## Installation
First, clone this repo and `cd` into the main directory.  Then:
```shell
npm install
```

## Development
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

To serve a specific environment, simply: 
```shell
ng serve --env=david
```

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Testing
For unit tests, run `ng test`.

For end-to-end tests, run `ng e2e`.

## Linting
This project has a `tsling.json` file.  There are many ways to lint, but the most popular is integration within your code editor.
Some useful links
* [TSLint](https://palantir.github.io/tslint/)
* [VS Code](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
* [Sublime](https://github.com/lavrton/SublimeLinter-contrib-tslint)
* [Webstorm](https://www.jetbrains.com/help/webstorm/tslint.html)

## Code Consistency
For consistent code across developers, apply `prettier` to developed pages.
https://prettier.io/docs/en/editors.html

## Redux Dev Tools
Install this tool to help with Redux Development
http://extension.remotedev.io/

## Design Decisions
* Angular 5 has a comprehensive CLI for quickly bootstrapping a site.
* I'm using ngrx/store and ngrx/effects to manage application state (it's Redux using Observables).

## Thoughts on Improvements
Since the job is mostly node, I gave this app a little less time & love.  If I had more time, I'd
* Build out the unit and e2e tests (just defaults in there now).
* Automate the build and deployment with Travis or Jenkins.
* Add in more robust authentication.
* Create a docker image to run the app in.