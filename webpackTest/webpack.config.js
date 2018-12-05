/* webpack.config.js */
var webpack = require('webpack')
var ExtractTextPlugin =require('extract-text-webpack-plugin');
var HtmlWebpackPlugin =require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports = {
    mode:'production',
    // devtool: 'source-map',
    entry: {
        entry:'./src/js/entry.js',
        greet:'./src/js/greet.js'
    },
    output: {
        path: __dirname + "/public",
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules:[{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: MiniCssExtractPlugin.loader//建议生产环境采用此方式解耦CSS文件与js文件
             },{
               loader: 'css-loader',//CSS加载器
               options: {importLoaders: 2}//指定css-loader处理前最多可以经过的loader个数     
             },{
               loader: 'postcss-loader',
               options:{
                plugins:[
                    require('autoprefixer')
                ]
               }//承载autoprefixer功能
             },{
               loader: 'sass-loader'//SCSS加载器，webpack默认使用node-sass进行编译
             }
           ]
        },{
            test: /\.vue$/,
            loader: "vue-loader"
        },
        {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader//建议生产环境采用此方式解耦CSS文件与js文件
             },{
                loader:'style-loader'
             },{
               loader: 'css-loader',//CSS加载器
               options: {importLoaders: 2}//指定css-loader处理前最多可以经过的loader个数     
             }
           ]
        },{
            test:/\.js$/,
            loader:"babel-loader",
            exclude: /node_modules/
        }
    ]
    },
    plugins:[
        new ExtractTextPlugin('[name].css'),
        new webpack.BannerPlugin('webpack学习'),
        new MiniCssExtractPlugin({
            filename: "[name].css"
          }),//为抽取出的独立的CSS文件设置配置参数
        new HtmlWebpackPlugin({
            title:'测试webpack',
            template: './index.html', // 源模板文件
            filename: './index1.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            showErrors: true,
            inject: 'body',
            chunks: ["greet"],
            hash:true,
            minify:{
                caseSensitive: false, //是否大小写敏感
                removeComments:true, // 去除注释
                removeEmptyAttributes:true, // 去除空属性
                collapseWhitespace: true //是否去除空格
            }
        }),
        new HtmlWebpackPlugin({
            title:'测试webpack',
            template: 'entry.html', // 源模板文件
            filename: './an1.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            showErrors: true,
            inject: 'body',
            chunks: ["entry"],
            hash:true,
            minify:{
                caseSensitive: false, //是否大小写敏感
                removeComments:true, // 去除注释
                removeEmptyAttributes:true, // 去除空属性
                collapseWhitespace: true //是否去除空格
            }
        }),
        new CleanWebpackPlugin(
            ['dist/*.js','dist/*.html','dist/*.css'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
    ],
    optimization:{
        //对生成的CSS文件进行代码压缩 mode='production'时生效
        minimizer:[
           new OptimizeCssAssetsPlugin()
        ]
      }
}
