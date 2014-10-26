'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: "./client.js",
    output: {
        path: './build',
        filename: "client.js"
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
            { test: /\.jsx$/,  loader: 'jsx-loader' }
        ]
    },
    plugins: [
        new ExtractTextPlugin("app.css", { allChunks: true })
    ]
};