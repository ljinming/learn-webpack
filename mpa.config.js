const glob = require('glob');
const { resolve, join } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssPlugin = require('mini-css-extract-plugin');

function mpa() {
  let entry = {};
  let htmlWebpackPlugins = [];

  const entryPath = glob.sync(join(__dirname, './src/*/index.js'));
  entryPath.forEach((item) => {
    //'/Users/ming/code/learn-webpack/src/home/index.js',
    /*
    item.match(/src\/(.*)\/index\.js$/),
        [
        'src/login/index.js',
        'login',
        index: 31,
        input: '/Users/ming/code/learn-webpack/src/login/index.js',
        groups: undefined
        ]
    */
    const entryName = item.match(/src\/(.*)\/index\.js$/)[1];
    entry[entryName] = item;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: join(__dirname, `./public/${entryName}.html`),
        filename: `${entryName}.html`,
        chunks: [entryName],
      })
    );
  });

  return { entry, htmlWebpackPlugins };
}

const { entry, htmlWebpackPlugins } = mpa();

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: resolve(__dirname, './mpa'),
    filename: 'js/[name].js', //name 占位符 代表着打包出来以后，会被替换
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
    ...htmlWebpackPlugins,
    new miniCssPlugin({
      filename: 'style/index.css',
    }),
  ],
};
