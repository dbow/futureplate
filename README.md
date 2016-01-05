# isoReacTiFlux

A simple boilerplate for isomorphic/universal react + flux.

## goals

* Simple, Unopinionated, and Clear

    * As few dependencies as possible.
    * The purpose of each dependecy is clear.
    * Code is readable and understandable and achieves only what is outlined here in the goals, nothing more.
    * Flexible structure, beyond the few core opinions outlined here.
    * Explicitness and clarity are preferred over "magic," even where things seem verbose.

* Flux Architecture

    * Stores are objects with immutable `state`.
    * Actions update the `state` of the Stores.
    * Components re-render whenever Store `state` changes.

* Isomorphic/Universal

    * App renders content on the server before client takes over.

* Routing

    * A single file defines routes and their action dependencies for both server and client.

* Caching

    * Stores implement caching and cache expiration.
    * Actions check whether store has cached data before fetching it.

* Styles

    * Just plain CSS.
    * Preprocessors, etc. can be added easily as desired.

* Development flow

    * Styles hot reload on change during development.
    * All JS uses ES6 syntax.

* Tests

    * Stores and Actions have unit tests.

## not goals

* Functional stores (reducers, like redux)
* Hot reloading in JS
* Store-specific re-renders
* UI tests

## setup

* **requires node v4! make sure your environment is up to date**
* `npm install`
* `npm run dev` to bundle the assets and start the web server at http://localhost:3000/

## technologies

* [express](http://expressjs.com/en/index.html) for the web server
* [react](https://facebook.github.io/react/) for component rendering
* [react-router](https://github.com/rackt/react-router) for client routing
* [webpack](https://webpack.github.io/) to preprocess and bundle css and js
* [babel](https://babeljs.io/) to allow for ES6 syntax
* [superagent](http://visionmedia.github.io/superagent/) for AJAX


## inspiration

* [react-isomorphic-boilerplate](http://jmfurlott.com/tutorial-setting-up-a-simple-isomorphic-react-app/)
* [react-router-mega-demo](https://github.com/rackt/react-router-mega-demo)

