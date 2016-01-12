# FuturePlate

A simple boilerplate for universal react + flux + react-router + css modules.

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

* Universal

    * App renders content on the server before client takes over.

* Routing

    * A single file defines routes and their action dependencies for both server and client.
    * Action dependencies reflect the routing hierarchy (a child route will ensure that both its and its parents' dependencies are present).

* Caching

    * Stores implement caching and cache expiration.
    * Actions check whether store has cached data before fetching it.

* Styles

    * Just plain CSS.
    * Preprocessors, etc. can be added easily as desired.
    * CSS Modules provide modular (component-scoped classes) and reusable (composable) CSS that brings order to the global scope and explicitly ties CSS into the components hierarchy while still just being simple CSS files.

* Development flow

    * All JS uses ES6 syntax.
    * Re-compile bundle and re-start server on any change.
    * Optional hot reloading for React components and CSS modules.

* Tests

    * Stores and Actions have unit tests.

## not goals

* Functional stores (reducers, like redux)
* Store-specific re-renders
* UI tests

## setup

* **requires node v4! make sure your environment is up to date**
* `npm install`
* `npm run start`

    * Compiles assets for production.
    * Runs web server in production mode.
    * CSS extracted to a static file (main.css).

* `npm run dev-build` && `npm run dev` (two terminals)

    * Compiles assets for development and watches to re-compile
    * Runs web server via nodemon to re-start on changes.
    * Must be done in two terminals since `dev-build` runs webpack in watch mode
    * CSS loaded on the client via `<style>` tags

* `npm run hot`

    * Compiles assets for development and runs web server in hot module replacement mode.

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
* [Handcrafting an isomorphic redux application with love](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.n33zx5ee0)
* [book-shelf](https://github.com/jarsbe/book-shelf/tree/isomorphic)
* [isomorphic500](https://github.com/gpbl/isomorphic500)
* [Backend Apps with Webpack](http://jlongster.com/Backend-Apps-with-Webpack--Part-I)
* [react-howto](https://github.com/petehunt/react-howto)
* [webpack-howto](https://github.com/petehunt/webpack-howto)
* [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
* [The ultimate Webpack setup](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup)

## TODOs

* Lazy Routes
* Routing

    Add a way to define blocking actions on routes.  
    i.e. actions that must complete *before* the route component is rendered.  
    Add a way to define error handling for route dependencies.  
    In general, this would be for client-side 404-type situations so that
    a 404 page can be shown without a flicker.

* Tests

