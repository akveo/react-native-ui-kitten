var path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname) + '/examples/index.js',
	
	output: {
		path: path.resolve(__dirname) + '/dist',
		publicPath: '/dist',
		filename: 'react-ui-kitten.min.js'
	},
	
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				test: /\.js$/,
				query: {
					presets: ['env', 'stage-0', 'react']
				}
			},

			{
				loader: 'file-loader',
				test: /\.(png|jpg|gif)$/
			}
		]
	},

	/* Just in case */
	resolve: {
		alias: {
			"react-native": "react-native-web"
		}
	},

	/* Uglify JS */
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true,
			compress: true
		})
	]
};
