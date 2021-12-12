const webpack = require('webpack');
const config = require('./webpack.config.js');

const compiler = webpack(config);

Object.keys(compiler.hooks).forEach((hookName) => {
  //同步钩子 用tap
  //异步钩子 用tapAsync
  compiler.hooks[hookName].tap('事件名称', () => {
    console.log('-------钩子', hookName);
  });
});

compiler.run();
