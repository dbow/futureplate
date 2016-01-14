# futureplate

A simple boilerplate for

\+ **universal react**

\+ **flux**

\+ **react-router**

\+ **css modules**

\+ **code splitting**

## goals

* **Simple and Clear**

    * As few dependencies as possible, with a clear purpose for each.
    * Code is readable and understandable and achieves only what is outlined here in the goals, nothing more.

* **Flux Architecture**

    * Simple Flux implementation inspired by (and probably pretty interchangeable with) Redux.
    * Top level `Store` object with as many child stores as necessary.
    * Simple cache for `Store` data.
    * Only actions can update the stores.
    * Higher order components are used to add a `Store` reference to React `context` and to re-render components on any change to store.


* **Universal**

    * App renders content on the server before client takes over.

* **Routing**

    * A single file defines routes **and their action dependencies** for both server and client.
    * Action dependencies reflect the routing hierarchy (a child route will ensure that both its and its parents' dependencies are present).

* **Styles**

    * CSS Modules provide modular (component-scoped classes) and reusable (composable) CSS that brings order to the global scope and explicitly ties CSS into the component hierarchy while still just being simple CSS files.
    * Preprocessors, etc. can be added easily as desired.

* **Development flow and Build Process**

    * All JS uses ES6 syntax via Babel.
    * Webpack provides module bundling.
    * Code splitting can be implemented on the router level.
    * Dev Mode: Re-compile bundle(s) and re-start server on any change.
    * Hot Module Replacement Mode: Optional hot reloading for React components and CSS modules.


## not goals

* Functional stores (reducers, like redux).
* Store-specific re-renders (re-render triggered on entire component tree on any store update).
* UI tests


## setup

* **requires node v4! make sure your environment is up to date**
* `npm install`
* `npm run start`

    * Compiles assets for production.
    * Runs web server in production mode.
    * CSS extracted to a static file (main.css).

* `npm run dev-build` && `npm run dev` (two terminals)

    * Compiles assets for development and watches to re-compile.
    * Runs web server via nodemon to re-start on changes.
    * *Must be done in two terminals since `dev-build` runs webpack in watch mode*.
    * CSS loaded on the client via `<style>` tags.

* `npm run hot`

    * Compiles assets for development and runs web server in hot module replacement mode.

## core technologies

* [express](http://expressjs.com/en/index.html) for the web server.
* [react](https://facebook.github.io/react/) for component rendering.
* [react-router](https://github.com/rackt/react-router) for universal routing.
* [webpack](https://webpack.github.io/) to preprocess and bundle css and js and implement code splitting.
* [babel](https://babeljs.io/) to allow for ES6 syntax.
* [superagent](http://visionmedia.github.io/superagent/) for client and node AJAX.

## honorable mentions

* [nodemon](https://github.com/remy/nodemon) to restart web server in dev mode after re-compiling bundles.

Store:
* [react-addons-update](https://facebook.github.io/react/docs/update.html) to implement immutable updates in the `Store`.

CSS processing:
* [autoprefixer](https://github.com/postcss/autoprefixer) to add browser prefixes to CSS as needed.
* [css-loader](https://github.com/webpack/css-loader) to provide CSS modules functionality via webpack.
* [style-loader](https://github.com/webpack/style-loader) to add style tags for CSS on demand in the browser.
* [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) to compile all CSS into a separate file in production.
* [null-loader](https://github.com/webpack/null-loader) to ignore global CSS in the server render bundle.

Hot Module Replacement:
* [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre) to add react hot module replacement presets.
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) to set up the webpack dev server on the express server.
* [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) to set up hot module replacement on the express server.


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

* Tests
* Routing

    * Add a way to define blocking actions on routes. i.e. actions that must complete *before* the route component is rendered.  
    * Add a way to define error handling for route dependencies. In general, this would be for client-side 404-type situations so that a 404 page can be shown without a flicker.

