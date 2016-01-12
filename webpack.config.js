const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Run `webpack` with NODE_ENV=development to do a dev build. Defaults to
 * production.
 */
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const HMR = process.env.BABEL_ENV === 'HMR';


/**
 * Path configuration.
 */
const OUTPUT_DIR = path.join(__dirname, 'build');
const RESOLVE = {
  root: __dirname
};


/**
 * JS loader configuration.
 *
 * Compile with Babel and ignore node_modules.
 */
const JS_LOADER = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    presets: ['es2015', 'react'],
  },
};


/**
 * CSS loader configuration.
 */

// The pattern to use for the CSS modules generated classnames.
const CSS_CLASS_PATTERN = '[name]__[local]___[hash:base64:5]';
// Parameters for css-loader - sets up CSS modules and the classname pattern.
const CSS_LOADER_PARAMS = '?modules&localIdentName=' + CSS_CLASS_PATTERN;

/**
 * The different handlers for CSS requires.
 * Usage varies based on target (client vs. server) and environment
 * (development vs. production).
 */
const CSS_LOADERS = {
  // Extract the CSS module classnames only.
  CLASSNAMES: 'css-loader/locals' + CSS_LOADER_PARAMS,
  // Compile the CSS to a separate file.
  FILE: ExtractTextPlugin.extract('style-loader',
      'css-loader' + CSS_LOADER_PARAMS + '&importLoaders=1!autoprefixer-loader'),
  // Add styles via <style> tags.
  STYLETAGS: 'style-loader!css-loader' + CSS_LOADER_PARAMS,
};


/**
 * Client configuration.
 *
 * Generates client.js file served to the browser.
 *
 * In production, CSS just returns classnames, as all the CSS will be served
 * separately in the main.css file.
 *
 * In development, CSS is added via <style> tags on demand.
 */
const client = {

  devtool: DEVELOPMENT ? 'sourcemaps' : undefined,

  entry: HMR ? [
    './src/client',
    // Hot reloading
    'webpack-hot-middleware/client',
  ] : './src/client',

  output: {
    path: OUTPUT_DIR,
    filename: 'client.js',
    publicPath: '/build/',
  },

  resolve: RESOLVE,

  module: {
    loaders: [

      JS_LOADER,

      {
        test: /\.css/,
        exclude: /node_modules/,
        loader: DEVELOPMENT ? CSS_LOADERS.STYLETAGS : CSS_LOADERS.CLASSNAMES,
      },

    ]
  },

  plugins: HMR ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [],
};


/**
 * Server configuration.
 *
 * Generates the server.js file used to render markup on the server.
 *
 * In production, CSS is extracted into a separate bundle file.
 *
 * In development, CSS returns classnames (the CSS is added on the client via
 * <style> tags).
 */
const server = {

  devtool: DEVELOPMENT ? 'sourcemaps' : undefined,

  entry: './src/routes.js',

  target: 'node',

  /**
   * Only bundle the source code (imports beginning in 'src' or relative
   * imports e.g. ./somefile). All other imports are treated as externals.
   * https://webpack.github.io/docs/configuration.html#externals
   */
  externals: function(context, request, callback) {
    if (request.indexOf('src') !== 0 &&
        request.indexOf('.') !== 0) {
      return callback(null, 'commonjs ' + request);
    }
    callback();
  },

  resolve: RESOLVE,

  output: {
    path: OUTPUT_DIR,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  // Node variables:
  //     http://jlongster.com/Backend-Apps-with-Webpack--Part-II#Node-Variables
  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [

      JS_LOADER,

      {
        test: /\.css/,
        exclude: /node_modules/,
        loader: DEVELOPMENT ? CSS_LOADERS.CLASSNAMES : CSS_LOADERS.FILE,
      },

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('http://localhost:3000/api/'),
      },
    }),
  ],
};

if (!DEVELOPMENT) {
  server.plugins.push(new ExtractTextPlugin('main.css', {
    allChunks: true
  }));
}


module.exports = [client, server];

