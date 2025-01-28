const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = (env, argv) => {
    const mode = argv.mode || process.env.NODE_ENV || 'development';
    const devMode = mode === 'development';
    const target = devMode ? 'web' : 'browserslist';
    const devtool = devMode ? 'source-map' : undefined;
    const distDir = devMode ? 'build' : 'docs';

    console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
    console.log(`mode=${mode}`);
    console.log(`devMode=${devMode}`);
    console.log(`distDir=${distDir}`);

    return {
        mode,
        target,
        devtool,
        devServer: {
            port: 3000,
            open: true,
            hot: true
        },
        entry: {
            index: path.resolve(__dirname, 'src', 'index.js'),
        },
        resolve: {
            extensions: ['.js'],
        },
        output: {
            path: path.resolve(__dirname, distDir),
            clean: true,
            filename: '[name].[contenthash].bundle.js',
            assetModuleFilename: 'assets/[name].[hash][ext]',
        },
        performance: {
            hints: false
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                favicon: path.resolve(__dirname, 'src', 'img', 'favicon.ico'),
                htmlTemplates: fs.readFileSync(path.resolve(__dirname, 'src', 'html', 'parts', 'html-templates.html'), 'utf8'),
                inject: "body",
            }),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        ],
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                },
                {
                    test: /\.(woff(2)?)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        optimization: {
            splitChunks: {
                name: 'chunk',
                maxSize: 250000,
                chunks: 'all'
            },
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ['gifsicle', { interlaced: false }],
                                ['jpegtran', { progressive: true,  }],
                                ['optipng', { optimizationLevel: 5 }],
                            ],
                        },
                    },
                }),       
            ]
        },
    };
}