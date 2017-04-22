const webpack = require('webpack');
const path = require("path");
//分离CSS，JS插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
//自动打开页面
var OpenBrowserPlugin = require('open-browser-webpack-plugin');



module.exports = {
    //配置生成Source Maps
    devtool: 'cheap-source-map',
    entry:{
        //入口文件
        main:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname, "build"),
        filename: '[name].js',
        //启动目录默认是'/'
        publicPath: '/build'
    },
    
    module:{
        loaders:[
            { test: /\.js$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, include: path.resolve(__dirname, 'src'), loader: 'style-loader!css-loader' }

        ]
    },

/*    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                //移除注释
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("styles.css")
    ]*/
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
]
};