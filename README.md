# futureplate

#### a simple-ish boilerplate for

\+ **[universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.3br8rkdud) [react](https://facebook.github.io/react/)**

\+ **([redux](http://redux.js.org/)-y) [flux](https://facebook.github.io/flux/)**

\+ **[react-router](https://github.com/rackt/react-router)**

\+ **[css modules](http://glenmaddern.com/articles/css-modules)**

\+ **[code splitting](https://webpack.github.io/docs/code-splitting.html)**

\+ **[hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html)**

## Goals

* **Simple and Clear**

    * As few dependencies as possible, with a clear purpose for each.
    * Code is readable and understandable and achieves only what is outlined here in the goals, nothing more.

* **Flux Architecture**

    * Simple Flux implementation inspired by (and probably pretty interchangeable with) Redux.
    * Top level `Store` object with as many child stores as necessary.
    * Simple cache for `Store` data.
    * Only actions should update the stores.
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
    * Code splitting can be implemented **on the router level**.
    * Dev Mode: Re-compile bundle(s) and re-start server on any change.
    * Hot Module Replacement Mode: Optional hot reloading for React components and CSS modules.


## !Goals

* Functional stores (reducers, like redux).
* Store-specific re-renders (re-render triggered on entire component tree on any store update).
* UI tests


## Setup

**requires node v4! make sure your environment is up to date**

`npm install`

### Production

`npm run start`

Compiles assets via `npm run build` and then starts the web server in production mode.
`npm run build` just runs `webpack` to compile both the client and server rendering bundle in production mode.
CSS is extracted into a separate static file (main.css), which is added to the index.jade template on the web server.

*NOTE: `ExtractTextPlugin` is __not__ run in `allChunks` mode by default, so CSS required by routes that are split out into separate chunks will not be extracted. That CSS is added on the client in a `<style>` tag, which might create a FOUC and be undesirable. Webpack is [very flexible](https://webpack.github.io/docs/stylesheets.html#separate-css-bundle) with how it handles stylesheets and a specific strategy should be implemented based on the requirements of the particular site.*


### Development

`npm run build:dev`

Compiles assets for development with webpack in watch mode, re-compiling on any file change.
CSS is loaded on the client via `<style>` tags (using `style-loader`).

`npm run start:dev`

Starts the web server via nodemon to re-start on any change (such as when webpack re-compiles the server-render bundle).


### Hot Module Replacement

`npm run build:hot`

Runs the `build:dev` script with HMR flag so it only compiles the server-render bundle (since the client bundle is handled by the webpack-dev-server).

`npm run start:hot`

Runs the `start:dev` script with HMR flag which tells the server to retrieve the client scripts from the webpack-dev-server.

`npm run hot`

Compiles the client bundle with hot module replacement (BABEL_ENV=hmr tells it to use hot module replacement via .babelrc and in the webpack config) and serves it on port 8080 via webpack-dev-server.


## Core Technologies

* [express](http://expressjs.com/en/index.html) for the web server.
* [react](https://facebook.github.io/react/) for component rendering.
* [react-router](https://github.com/rackt/react-router) for universal routing.
* [webpack](https://webpack.github.io/) to preprocess and bundle css and js and implement code splitting.
* [babel](https://babeljs.io/) to allow for ES2015 syntax.


## Honorable Mentions

* **babel**
   * [babel-loader](https://github.com/babel/babel-loader) to use babel in webpack.
   * [babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) to transform ES2015 into ES5
   * [babel-preset-react](https://babeljs.io/docs/plugins/preset-react/) to transform JSX into createElement calls.
* **css processing**
   * [autoprefixer](https://github.com/postcss/autoprefixer) to add browser prefixes to CSS as needed.
   * [css-loader](https://github.com/webpack/css-loader) to provide CSS modules functionality via webpack.
   * [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) to compile all CSS into a separate file in production.
   * [null-loader](https://github.com/webpack/null-loader) to ignore global CSS in the server render bundle.
   * [postcss-loader](https://github.com/postcss/postcss-loader) to postprocess CSS in webpack.
   * [postcss-import](https://github.com/postcss/postcss-import) to inline @import calls in CSS.
   * [style-loader](https://github.com/webpack/style-loader) to add style tags for CSS on demand in the browser.
* **utility/misc**
   * [jade](http://jade-lang.com/) for node templates.
   * [lodash](lodash.com) for utility functions.
   * [react-addons-update](https://facebook.github.io/react/docs/update.html) to implement immutable updates in the `Store`.
   * [serialize-javascript](https://github.com/yahoo/serialize-javascript) to serialize store state and pass it safely to the client.
   * [serve-favicon](https://github.com/expressjs/serve-favicon) to serve the favicon.ico.
   * [source-map-support](https://github.com/evanw/node-source-map-support) for source map support in node.
   * [superagent](http://visionmedia.github.io/superagent/) for client and node AJAX.
* **development**
   * [nodemon](https://github.com/remy/nodemon) to restart web server in dev mode after re-compiling bundles.
   * [rimraf](https://github.com/isaacs/rimraf) to clean the build directory.
* **hot module replacement**
   * [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre) to add react hot module replacement transforms (i.e. [react-transform-hmr](https://github.com/gaearon/react-transform-hmr), [react-transform-catch-errors](https://github.com/gaearon/react-transform-catch-errors), and [redbox-react](https://github.com/KeywordBrain/redbox-react))
   * [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) to set up hot module replacement of client assets.


## Inspiration

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
* [Welcome to Future of Web Application Delivery](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.fdd6gffgt)
* [example-react-router-server-rendering-lazy-routes](https://github.com/rackt/example-react-router-server-rendering-lazy-routes)

## TODOs

* Add Testing framework (Jest) and some unit test examples.
* Routing

    * Add a way to define blocking actions on routes. i.e. actions that must complete *before* the route component is rendered.  
    * Add a way to define error handling for route dependencies. In general, this would be for client-side 404-type situations so that a 404 page can be shown without a flicker.

