// 键值不是字符串而是 Symbol

var test = {}
let sym = Symbol('我是一个Symbol')
test[sym] = 'symbol'

let result = deepClone(test)
console.log(result)
console.log(result[sym] === test[sym])
// 拷贝失败了， 为什么？

// 因为 Symbol 是一种特殊的数据类型， 它最大的特点便是独一无二， 所以它的深拷贝就是浅拷贝