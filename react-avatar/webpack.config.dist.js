const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/ReactAvatar.jsx',
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
			use: [ 'css-loader', 'less-loader?javascriptEnabled=1' ]
		}]
    },
    externals: [nodeExternals()]
};
