// 3. lodash中深拷贝的实现
// Lodash是一个轻量级的JavaScript工具函数库， 它方便了日常开发中对数据的操作， 提高了开发效率。
// 著名的 lodash 中的 cloneDeep 方法同样是使用 Reflect 法 实现的， 
// 只不过它支持的对象种类更多， 具体的实现过程读者可以参考 lodash 的 baseClone 方法。 
// lodash可以完成array、 object、 date、 regexp的深拷贝， 但

// function 和 error 仍然不可拷贝

// https://github.com/lodash/lodash/blob/master/.internal/baseClone.js
// ​ 日常开发中，通常会对数据，特别是数组和对象进行各种读写等操作：
//  比如去重，拷贝，合并，过滤，求交集，求和等等。根据平时开发中对数据的操作，
const _ = require('lodash')
const obj = {
    a: 1
}
obj.loopObj = obj
const obj1 = _.cloneDeep(obj)
console.log(obj1 === obj)