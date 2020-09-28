// 优势: 
// Proxy 的第二个参数可以有 13 种拦截方法， 
// 比 Object.defineProperty() 要更加丰富,
// Proxy 作为新标准受到浏览器厂商的重点关注和性能优化， 
// 相比之下 Object.defineProperty() 是一个已有的老方法。
// Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,
// 而Object.defineProperty只能遍历对象属性直接修改。
// 劣势:
// Proxy 的兼容性不如 Object.defineProperty() 可是使用 polyfill 来处理兼容性