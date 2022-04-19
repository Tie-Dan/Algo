// module.exports = function (source) {
//     console.log('source>>>>', source)
//     return source
// }

// syncLoader.js
const loaderUtils = require('loader-utils')
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    console.log(options.message)
    // 可以传递更详细的信息
    this.callback(null, source) // 或者retrun都行
}