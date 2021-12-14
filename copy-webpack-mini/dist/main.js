(function (moduleInfo) {
  function require(modulePath) {
    // ./src/index.js
    // 当modulePath 为'./a.js'的样子式，存在eval找不到改文件
    // 通过fixPath 函数转换为 './src/a'

    function fixPath(reletivePath) {
      // 相对路径
      return require(moduleInfo[modulePath].dependencies[reletivePath]);
    }

    const exports = {};
    // eval 语句执行代码片段
    (function (require, code) {
      eval(code);
    })(fixPath, moduleInfo[modulePath].code);

    return exports;
  }
  require('./src/index.js');
})({
  './src/index.js': {
    dependencies: { './a.js': './src/a.js' },
    code: '"use strict";\n\nvar _a = require("./a.js");\n\nconsole.log(\'hello miniwebpack\' + _a.a);',
  },
  './src/a.js': {
    dependencies: { './b.js': './src/b.js' },
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.a = void 0;\n\nvar _b = require("./b.js");\n\nvar a = \'a\' + _b.b;\nexports.a = a;',
  },
  './src/b.js': {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.b = void 0;\nvar b = \'b\';\nexports.b = b;',
  },
});
