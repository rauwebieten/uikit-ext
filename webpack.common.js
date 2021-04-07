const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'uikit-ext': path.resolve(__dirname, 'src/uikit-ext.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: '_' // make the exports from the entry file available as "_" variable in HTML doc
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        // plugin to create index.html file
        new HtmlWebpackPlugin({
            template: 'src/uikit-ext.pug',
        }),
        // plugin to build CSS in a separate file
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    module: {
        rules: [
            // PUG files
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            // CSS files (css, scss)
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // CSS loader, need this for loading google fonts
                    'css-loader',
                    // SASS loader, NOT node-sass,
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true,
                            implementation: require('sass'), // not node-sass !
                        }
                    }
                ],
            },
            // JS files
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    // use babel plugin to support older browsers
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
        ],
    },
};