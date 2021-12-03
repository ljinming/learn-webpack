//自定义loader

/*
loader 是一个函数，但不可以是箭头函数,(因为loader api 绑定在this上)
loader 必须有返回值 string｜buffer
loader 如何接受配置 - 通过loaderAPI
如何返回多个信息 this.callback 可以同步或者异步调用的并返回多个结果的函数。预期的参数是：
                                                                        this.callback(
                                                  
                                                                            err: Error | null,
                                                                        content: string | Buffer,
                                                                        sourceMap?: SourceMap,
                                                                        meta?: any
                                                                        );
loader 如何让处理异步逻辑 告诉 loader-runner 这个 loader 将会异步地回调。返回 this.callback。
多个loader 如果配合
*/

module.exports = function (source) {
  return source.replace('hello', '你好，');
};
