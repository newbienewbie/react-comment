module.exports = {
  plugins: [
    // require('postcss-smart-import')({ /* ...options */ }),
    // require('precss')({ /* ...options */ }),
    require('autoprefixer')({
         browsers: 'last 5 version' //前五种浏览器版本
    })
  ]
}