var path = require('path');
var express = require('express');
// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var opn = require('opn');
var app = express();
var port = 3000;

app.use('/static', express.static(__dirname + '/static'));

//console.log(process.env, '====');
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
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    // 第三步：将热更新中间件附加到编译器和服务器 
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
})();


var data = Mock.mock(
    [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 0,
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'url|+1': Random.image()
        }]

    }]
)

app.get('/gamelist', function(req, res) {
    list = require('./src/api/gameList.json')
    res.header("Access-Control-Allow-Origin", "*");
    res.json(list)
})

app.get('/nav', function(req, res) {
    list = require('./src/api/nav.json')
    res.header("Access-Control-Allow-Origin", "*");
    res.json(list)
})

app.get('/list', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data)
})

app.get('／', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var uri = 'http://localhost:' + port;

app.listen(port, 'localhost', function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
        opn(uri);
    }
});