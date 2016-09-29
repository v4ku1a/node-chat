const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname + '/public/',
        filename: "app.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: path.resolve(__dirname, '/client/')
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015','angular2']
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, '/client/'),
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?minimize&-autoprefixer!postcss!sass'
                )
            }
        ]
    },
    postcss() {
        return [autoprefixer({
            browsers: ['last 3 versions']
        })];
    },
    plugins: [
        new ExtractTextPlugin('app.css', {allChunks: false}),
        new CopyWebpackPlugin([ { from: './client/index.html' } ])
    ]
};