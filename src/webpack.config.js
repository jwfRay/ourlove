
var webpack = require('webpack');

module.exports = {
    entry: {
        isearch: [
            'babel-polyfill',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './index.js'
        ]
    },
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    alias: {
        'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'sass'
                ]
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel'],
                include: [__dirname] 
            },
            { 
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
              }
            }
        ]
    },
     plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({$:"jquery",jQuery:"jquery","window.jQuery":"jquery"})
  ],
};