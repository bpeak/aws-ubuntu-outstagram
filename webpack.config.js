const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        "index": './react/src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'react','public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-object-rest-spread', 'babel-plugin-transform-class-properties']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true                       
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                  publicPath: '/public',
                  name: '[name].[ext]',
                  limit: 10000,
                }
            }
        ]
    },
    resolve: {
        alias: {
            '~routes' : path.resolve(__dirname, 'react/src/routes/'),
            'containers' : path.resolve(__dirname, 'react/src/containers/'),
            '~components' : path.resolve(__dirname, 'react/src/components/'),
            '~modules' : path.resolve(__dirname, 'react/src/modules/'),
            '~img' : path.resolve(__dirname, 'react/src/img/'),
            '~redux' : path.resolve(__dirname, 'react/src/redux/')
        }
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: './react/public/dev.html'
        }
    }
};