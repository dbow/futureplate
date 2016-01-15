var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var clientConfig = config[0];

var compiler = webpack(clientConfig);
var server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: clientConfig.output.publicPath,
});
server.listen(8080);

