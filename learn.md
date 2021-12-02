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
