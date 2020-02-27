// 深拷贝是针对引用类型的， 在进行深拷贝之前， 我们应该先知道js中有哪些引用类型， 
// js中引用类型目前有六种： object， array， date， regexp，
// function， err。 下面的两种方法只能实现object， array的深拷贝。

// 循环递归法1 
function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
}
// 迭代递归法：深拷贝对象与数组
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    return cloneObj
}