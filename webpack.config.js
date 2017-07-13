var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-hot-middleware/client?reload=true',
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
      	test: /\.(jpg|png|gif|svg)$/i, 
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
			inject: 'body'
		})
	]
}