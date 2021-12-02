//  webpack 基于nodejs

/*
// spa 但页面应用 mpa多页面应用

    入口：entry 
        string｜{}  多入口对应多出口
    出口:output{
        path: 生成的资源存放的位置，必须是绝对路径
        filename:生成资源的名字
    }
    plugins:[] 插件
    loader:
    我们知道 webpack 只会编译处理js，json格式的模块 . 用于对模块的源代码进行转换。
*/

const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  output: {
    path: resolve(__dirname, './build'),
    filename: '[name].js', //name 占位符 代表着打包出来以后，会被替换
  },

  module: {
    // 当webpack 原本不支持的模块，需要其他方式使之可以使用时，需要做module这个key 下对其设置
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'], //执行顺序 从后向前
        use: [miniCssPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new htmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      chunks: ['login'], //做资源的区分 只使用自己的资源
    }),
    new miniCssPlugin({
      filename: 'index.css',
    }),
  ],
};
