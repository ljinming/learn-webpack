// 插件的结构
/*
    类
    必须要有apply 函数,,拿到compiler
   compilation.assets获取了所有的assets，也就是每一个要处理的文件，

*/

class TxtWebpackPlugin {
  apply(compiler) {
    //异步调用
    compiler.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, callback) => {
      const content = '这是一个测试txt文本 自定义plugin';
      compilation.assets['test.txt'] = {
        source: function () {
          return content;
        },
        size: function () {
          return content.length;
        },
      };
      callback();
    });
  }
}

module.exports = TxtWebpackPlugin;

// 文档清单
