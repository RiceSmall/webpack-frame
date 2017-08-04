var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-hot-middleware/client?reload=true',//热加载，当我们的代码作出修改之后，我并不需要重新启动服务，他就可以让新的代码生效
		'./src/app.js',
	],	
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name]-bundle.js',
	},
	devServer: {
		hot: true,
		inline: true
	},
	module: {
    loaders: [
      { 
      	test: /\.js$/, 
      	loader: "babel",
      	exclude: path.resolve(__dirname, "node_modules"),
      	include: path.resolve(__dirname, "src")
      },
      {
      	test: /\.css$|.less$/,
      	use: [
			    { loader: 'style' },
			    { loader: 'css' },
			    { 
			    	loader: 'postcss', 
			    	options: { 
			    		sourceMap: true,
			    		plugins: [
			    			require('autoprefixer')({ broswers:['last 5 versions'] }),
			    		]
			    	} 
			    },
			    { loader: 'less'}
			  ]
      },
      {
      	test: /\.ejs$/, 
      	loader: "ejs",
      },
      {
      	test: /\.(jpg|png|gif|svg|woff)$/i, 
      	loaders: [
      			"url?limit=10000&name=img/[name]-[hash:5].[ext]",
      			"image-webpack"
      	]
      }
    ]
	},
	resolveLoader: {
			moduleExtensions: ['-loader']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body',
			title: '小甜甜'
		})
	]

}