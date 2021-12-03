开发模式打包出来后

是一个 js 文件 自调用函数

调用函数参数{} 称为依赖图
模块路径以及该模块被打包编译生成的 chunk(chunk 是代码片段),eval 语句里，就是被打包的代码片段（chunk）

(function )({})

- chunk: 代码片段 一个 module 对应一个 chunk
- chunks :chunks 组, 包含至少一个 chunk(module)
- bundle/ module
  一个 bundle 对应一个 chunkname/chunks
  一个 chunksname/chunks 至少包含一个 module(chunk)

MiniCssExtractPlugin 样式抽取成独立的样式文件

- postCss 处理 css 的 loader,允许使用 JS 插件转换样式的工具

- browserslist 说明目标浏览器集合的工具

  - 我们用到的需要做兼容的工具，比如 autoprefixer,babel,会通过 browserslist 声明的浏览器集合，针对性的输出兼容性的代码
  - 使用方式
    \*\* package.json 中直接使用
    {
    browserslist:['last 2 versions','>1%'] (['last 1 version','>5%'])
    } 固定用法，browserslist[0]代表 兼容所有浏览器最近的 2 个版本 。browserslist[1]表示 兼容市场上占有率大于 1%的浏览器
    ···
    {
    // "browserslist": [
    // "last 2 versions",
    // ">1%"
    // ]
    }

    ···

    \*\* 在项目的根目录里创建 .browserslistrc

- 集合校验 npx browserslist '集合'
  - npx browserslist 'last 2 versions,>1%';
