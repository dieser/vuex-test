const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'aurora.json')));
const production = process.env.NODE_ENV === 'production';

module.exports = {
	watch: !production,
	devtool: production ? 'source-map' : false,
	entry: (() => {
		let entries = { };

		config.entries.forEach(bundle => {
			if (!Array.isArray(bundle.entry)) {
				bundle.entry = [bundle.entry];
			}

			bundle.entry = bundle.entry.map(entry => {
				if (entry.substr(0, 1) === '/') return `./${config.src}/${entry}`;
				return entry;
			});

			entries[bundle.name] = bundle.entry;
		});

		return entries;
	})(),
	output: {
		filename: '[name]',
		publicPath: `/${config.dist}/`,
		path: path.resolve(__dirname, `../${config.public}/${config.dist}/`)
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader?sourceMap&outputStyle=' + (production ? 'compressed' : 'expanded')]
				})
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						sass: 'vue-style-loader!css-loader!sass-loader?outputStyle=' + (production ? 'compressed' : 'expanded'),
						scss: 'vue-style-loader!css-loader!sass-loader?outputStyle=' + (production ? 'compressed' : 'expanded'),
						css: 'vue-style-loader!css-loader'
					}
				}
			}, {
				test: /\.js$/i,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.(jpe?g|png|gif|svg|eot|ttf|otf|woff)$/i,
				loader: 'file-loader'
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	plugins: [new ExtractTextPlugin({ filename: '[name]', allChunks: true })].concat(production ? [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
		new UglifyJsPlugin()
	]: [])
};