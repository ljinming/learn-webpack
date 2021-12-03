// less -> css
// 使用到less,强依赖

const less = require('less');

module.exports = function (source) {
  less.render(source, (error, output) => {
    this.callback(error, output.css);
  });
};
