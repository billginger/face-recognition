const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/Example.jsx',
	output: {
		filename: 'js/bundle.js?[contenthash]',
		path: __dirname + '/example'
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { targets: { chrome: 58 } }],
						'@babel/preset-react'
					]
				}
			}
		}, {
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'less-loader']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/template.html',
			filename: 'index.html'
		})
	]
};
