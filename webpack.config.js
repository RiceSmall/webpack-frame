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
	},
	module: {
    loaders: [
      { 
      	test: /\.js$/, 
      	loader: "babel-loader",
      	exclude: path.resolve(__dirname, "node_modules"),
      	include: path.resolve(__dirname, "src")
      },
      {
      	test: /\.css$|.less$/,
      	use: [
			    { loader: 'style-loader' },
			    { loader: 'css-loader' },
			    { 
			    	loader: 'postcss-loader', 
			    	options: { 
			    		sourceMap: true,
			    		plugins: [
			    			require('autoprefixer')({ broswers:['last 5 versions'] }),
			    		]
			    	} 
			    },
			    { loader: 'less-loader'}
			  ]
      },
      {
      	test: /\.html$/, 
      	loader: "html-loader",
      },
      {
      	test: /\.ejs$/, 
      	loader: "ejs-loader",
      },
      {
      	test: /\.(jpg|png|gif|svg|woff)$/i, 
      	loaders: [
      			"url-loader?limit=10000&name=img/[name]-[hash:5].[ext]",
      			"image-webpack-loader"
      	]
      }
    ]
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