//  webpack 基于nodejs

/*
// spa 但页面应用 mpa多页面应用

    入口：entry  支持绝对路径或者相对路径
        string｜{}  多入口对应多出口
    出口:output{
        path: 生成的资源存放的位置，必须是绝对路径
        filename:生成资源的名字
    }
    plugins:[] 插件
    loader:
    我们知道 webpack 只会编译处理js，json格式的模块->用于对模块的源代码进行转换。
    loader 如何接受配置 ->{
    loader:name,
    options:{
        //loader的配置
    }
-file-loader 配置
    options:{
        //loader的配置
        name:生成资源的name
        outputPath：存放资源的文件
        publicPath:图片资源的引入资源的位置, 
        //当图片资源通过长css 方式引入时，打包出来的css文件会在主路径下，如果对css 做文件管理，存在找不到路径的情况，
        当存在publicPath 值时，css 会在publicPath的值下进行引入
    }
}
*/

const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssPlugin = require('mini-css-extract-plugin');
const txtplugin = require('./myplugins/txt-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/home/index.js',
    login: './src/login/index.js',
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js', //name 占位符 代表着打包出来以后，会被替换
  },
  resolveLoader: {
    modules: ['node_modules', './my-loaders'],
  },
  module: {
    // 当webpack 原本不支持的模块，需要其他方式使之可以使用时，需要做module这个key 下对其设置
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'], //执行顺序 从后向前
        use: [miniCssPlugin.loader, 'css-loader'],
        /*
        loader 配置 [miniCssPlugin.loader, 'css-loader'],
        = [miniCssPlugin.loader, {
            loader:'css-loader',
            options:{}
        }]
        */
      },
      {
        test: /\.less$/,
        use: [miniCssPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        //use: ['mystyle-loader', 'mycss-loader', 'myless-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]', //[ext] 占位符，原本是什么后缀名，就是什么后缀名，
            outputPath: 'images', // 存放资源的位置
            publicPath: '../images', // 图片资源的引入资源的位置
            limit: 3 * 1024,
          },
        },
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', //[ext] 占位符，原本是什么后缀名，就是什么后缀名，
            outputPath: 'font', // 存放资源的位置
            publicPath: '../font', // 图片资源的引入资源的位置
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                // {
                //   corejs: 2,
                //   useBuiltIns: 'usage',
                // },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      // 'image-webpack-loader',
      // 自定义loader
      {
        test: /\.js$/,
        use: [
          'js-async-loader', // 自定义loader webapck
          {
            loader: 'js-loader',
            options: {
              name: '自定义loader',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './public/home.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    // new htmlWebpackPlugin({
    //   template: './public/login.html',
    //   filename: 'login.html',
    //   chunks: ['login'], //做资源的区分 只使用自己的资源
    // }),
    new miniCssPlugin({
      filename: 'style/index.css',
    }),
    new txtplugin(),
  ],
};
