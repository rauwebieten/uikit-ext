const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        'uikit-ext': path.resolve(__dirname, 'src/uikit-ext.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: '_'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
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
    optimization: {
        minimize: devMode === false,
        minimizer: [
            new TerserPlugin({}), // plugin to minimize JS
            new OptimizeCSSAssetsPlugin({}) // plugin to minify CSS
        ],
    },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
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
    target: 'web',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
    },
};