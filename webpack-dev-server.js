'use strict';


const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');


console.warn(`
  WARNING!

  Hot Module Replacement does not work with stateless functional components
  right now.

  See:
      https://github.com/gaearon/react-transform-hmr#react
      https://github.com/gaearon/react-transform-hmr/issues/6
      https://github.com/gaearon/babel-plugin-react-transform/issues/57

`);


const HMR_URL = 'http://localhost:8080';

let clientConfig = config[0];

// Add Hot Module Replacement entries and plugins to client config, and update
// the publicPath to use the HMR_URL.
clientConfig.entry.main.unshift(`webpack-dev-server/client?${HMR_URL}`,
                                'webpack/hot/dev-server');
clientConfig.plugins = clientConfig.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);
clientConfig.output.publicPath = HMR_URL + clientConfig.output.publicPath;

var compiler = webpack(clientConfig);
var server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: clientConfig.output.publicPath,
});
server.listen(8080);

