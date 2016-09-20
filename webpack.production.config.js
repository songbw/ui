var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './src/index',
        vendor: ['react']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js',Infinity),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.less?$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader?{"sourceMap":false}'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url',
                query: {limit: 10240}
            }
        ]
    }
};
