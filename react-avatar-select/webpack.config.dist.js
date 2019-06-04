const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/AvatarSelect.jsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist',
		libraryTarget: 'commonjs2'
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
	externals: [nodeExternals()]
};
