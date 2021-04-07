const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// use dev server 4 (v3 corrupts library export)

module.exports = merge(common, {
    mode: 'development',
    target: 'web',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
    },
});