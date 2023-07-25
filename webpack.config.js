const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlBuilder = require('./build_module/html_builder.js');
const entryBuilder = require('./build_module/entry_builder.js');


function get_plugins() {
	let ps = htmlBuilder.htmls;
	return ps;
}

function get_entries() {
	let es = entryBuilder.entries;
	return es;
}

const scssRule = {
	test: /\.(scss)$/,
	use: [{
			loader: 'style-loader'
		},
		{
			loader: 'css-loader'
		},
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: () => [
						require('autoprefixer')
					]
				}
			}
		},
		{
			loader: 'sass-loader'
		}
	]
}

const cssRule={
	test: /\.css$/i,
	use: ["css-loader","style-loader"]
}

module.exports = {
	entry: get_entries(),
	output: {
		filename: '[name]',
		// path: path.resolve(__dirname, 'dist')
		path:"D:\\Temp\\static",
	},
	devServer: {
		static: "D:\\Temp\\static",
		port: 8080,
		hot: true
	},
	plugins: get_plugins(),

	module: {
		rules: [cssRule,scssRule]
	}
}
