const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: true,
    minify: {
        removeComments: true,        //去注释
        collapseWhitespace: true,    //压缩空格
        removeAttributeQuotes: true  //去除属性引用
    }
});

module.exports = (options = {}) => {

    return {
        entry: {
            bundle:[
                path.resolve(__dirname, 'src/main.js')
            ],
            vendor: ["jquery"]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name][hash].js',
            publicPath: options.dev ? '/' : './',
            chunkFilename: '[name].js' //注意这里，用[name]可以自动生成路由名称对应的js文件
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['imgs:src', 'link:href']
                            }
                        }
                    ]
                },

                {
                    test: /favicon\.png$/,
                    use: [
                        {
                            // 使用file-loader
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]'
                            }
                        }
                    ]
                },
                {test: /\.(png|jpg)$/, exclude: /favicon\.png$/,use: [{loader: 'url-loader', options: {limit: 15000,name:'./[name].[ext]?[hash]'}}]}
            ]
        },
        plugins: [
            HTMLWebpackPluginConfig,
            //热加载插件
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin('style.css'),
            new webpack.optimize.CommonsChunkPlugin({
             names: ['vendor'],
             filename: 'vendor.js'
             }),
             new webpack.optimize.UglifyJsPlugin({

             comments: false,        //去掉注释
             compress: {
                 warnings: false,    //忽略警告
                 drop_debugger: true,
                 drop_console: true
             }
             })
        ],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src')
            }
        }
    }
};