const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',

        library: { // make the exports from the entry file available as "_" variable in HTML doc
            type: 'var',
            name: '_',
        }
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({}), // plugin to minimize JS
            new CssMinimizerPlugin({  // plugin to minify CSS
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                }
            }),
        ],
    },
});