var path = require('path');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var port = 3000;

app.use('/static', express.static(__dirname + '/static'));

//创建一个立即执行函数
(function() {

  //Step 1: Create & configure a webpack compiler
  // 第一步：创建 并且 配置一个webpack编译器 
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  // 第二步：将dev中间件附加到编译器和服务器
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  // 第三步：将热更新中间件附加到编译器和服务器
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});