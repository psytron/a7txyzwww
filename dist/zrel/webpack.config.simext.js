
'use strict';
const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './blank_index.js',
    mode:'production',
    output: {
        filename: 'superbundlex1.js',
        path: path.resolve(__dirname, 'dist'),
    },    
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: false,
                uglifyOptions: {
                    compress: false,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files:{
                "xframe_bundlex.js": [
                    "js/ext/jquery-3.3.1.min.js",
                    "js/ext/TweenMax.min.js",
                    "js/ext/"
                ]
            }
        })
    ]
};