/*
@babel/traverse: 使用时，要加.default() 
 run () =>接受一个入口路径
ast.program.body
 [
  Node {
    type: 'ImportDeclaration',
    start: 0,
    end: 24,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 18,
      end: 23,
      loc: [SourceLocation],
      extra: [Object],
      value: './a'
    }
  },
  Node {
    type: 'ExpressionStatement',
    start: 25,
    end: 62,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    expression: Node {
      type: 'CallExpression',
      start: 25,
      end: 61,
      loc: [SourceLocation],
      callee: [Node],
      arguments: [Array]
    }
  }
]
*/

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const { join, dirname } = require('path');
const { transformFromAst } = require('@babel/core');

class Webpack {
  constructor(option) {
    this.entry = option.entry;
    this.output = option.output;
    this.modules = [];
  }

  run() {
    const moduleInfo = this.parse(this.entry); //一个模块生成的编译后的信息
    this.modules.push(moduleInfo);
    // 尾递归
    for (let i = 0; i < this.modules.length; i++) {
      const dependencies = this.modules[i].dependencies;
      if (dependencies) {
        for (let key in dependencies) {
          const modulePath = dependencies[key];
          if (modulePath) {
            this.modules.push(this.parse(modulePath));
          }
        }
      }
    }
    let obj = {};
    this.modules.forEach((item) => {
      obj[item.modulePath] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    this.bundlefile(obj);
  }

  parse(modulePath) {
    // 分析该模块是否有依赖？   modulePath 是入口路径了
    // 读取该路径文件 fs , @babel/parser 分析出模块依赖
    // 记录该依赖的路径【该依赖的原始路径时相对于模块入口的，要处理成根路径】@babel/traverse
    // 编译 生成代码片段 @babel/core
    const content = fs.readFileSync(modulePath, 'utf-8');
    const ast = parser.parse(content, {
      sourceType: 'module',
    }); // nodelist.program.body里是该模块的不同代码
    const dependencies = {}; //记录该依赖的路径
    traverse.default(ast, {
      ImportDeclaration: ({ node }) => {
        // 模块写入路径 node.source.value
        let fullPath = './' + join(dirname(modulePath), node.source.value);
        dependencies[node.source.value] = fullPath;
      },
    });
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    }); // code 经过编译的代码片段
    return {
      modulePath,
      dependencies,
      code,
    };
  }

  bundlefile(obj) {
    // 创建bundle文件，定义文件内容
    console.log(obj);
    const bundlePath = join(this.output.path, this.output.filename);
    const depmap = JSON.stringify(obj);

    const content = `
        (function(moduleInfo){

          function require(modulePath){
                // ./src/index.js
                // 当modulePath 为'./a.js'的样子式，存在eval找不到改文件
                // 通过fixPath 函数转换为 './src/a'


                function fixPath(reletivePath){
                    // 相对路径 
                    return require(moduleInfo[modulePath].dependencies[reletivePath])

                }

                const exports ={};
                // eval 语句执行代码片段
                (function(require,code){
                        eval(code)
                })(fixPath,moduleInfo[modulePath].code)

                return exports
            }
            require('${this.entry}')
        })(${depmap})
    `;

    fs.writeFileSync(bundlePath, content, 'utf-8');
  }
}

module.exports = Webpack;
