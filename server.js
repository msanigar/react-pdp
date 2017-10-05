var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');
var fs = require('fs');

var cert = fs.readFileSync(path.join(__dirname, "./server.crt"));
var key = fs.readFileSync(path.join(__dirname, "./server.key"));

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    https: {
      key: key,
      cert: cert
    },
    quiet: true // lets WebpackDashboard do its thing
  })
  .listen(9001, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:9001');
  });
