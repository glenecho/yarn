const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path:  resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.$js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.css$/i,
                use:['style-loader','css-loader'],
            },
            {
                test:/\.less$/i,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpg|png|gif)$/i,
                type: "asset"
            }
        ]
    },
    plugins:[ new HtmlWebpackPlugin({
        template: "./public/index.html"
    })]
}