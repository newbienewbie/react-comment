// 由于babel 默认不处理此文件，所以不使用 ES6 的特性

var Comment=require('./dist/container/comment').Comment;

// 暂时不想强制使用webpack打包css，所以注释掉之
// require('./dist/style.css');


module.exports={
    Comment:Comment,
};