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

/--------03------/

- 图片的使用场景

* js dom
* css background
* html img

webpack 4x 版本处理静态资源 可以通过 file-loader ｜ url-loader 处理
webpack 5x 版本处理静态资源，直接通过配置即可

- file-loader

```
options:{
       //loader的配置
       name:生成资源的name
       outputPath：存放资源的文件
       publicPath:图片资源的引入资源的位置,
       //当图片资源通过长css 方式引入时，打包出来的css文件会在主路径下，如果对css 做文件管理，存在找不到路径的情况，
       当存在publicPath 值时，css 会在publicPath的值下进行引入
   }
```

- url-loader url-loader 依赖 file-loader
  url-loader 会把图片转换成 base64 的格式， 转换成 base64 格式，可以减少一次图片的请求，从而达到优化的目的
  可以选择在图片<小于>多少字节时，对图片进行转换成 base64 格式。

```
options:{
       //loader的配置
       name:生成资源的name
       outputPath：存放资源的文件
       publicPath:图片资源的引入资源的位置,
       //当图片资源通过长css 方式引入时，打包出来的css文件会在主路径下，如果对css 做文件管理，存在找不到路径的情况，
       当存在publicPath 值时，css 会在publicPath的值下进行引入
       limit：3*1024，// 在图片<小于>1024时，对图片进行格式转换,base64格式时，占内存会变大，一般设置小于3kb,转换 // 为base64  1kb= 1024
   }
```

- 图片的压缩 image-webpack-loader 要求必须在 file-loader,url-loader 之前使用

  建议使用 cnpm 进行安装 npm,yarn 有可能会使这个 loader 的部分依赖安装失败

- 字体 https://www.iconfont.cn/ 阿里巴巴普惠题
  下载字体文件

/**\_**-----多页面打包通用解决方案-------/
