/* 
但如果这时我们使用 Reflect 实现的版本：
成功了，因为 for...in 无法获得 Symbol 类型的键，而 Reflect 是可以获取的。

当然，我们改造一下 for...in 实现也可以：

*/
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    let symKeys = Object.getOwnPropertySymbols(obj)
    // console.log(symKey)
    if (symKeys.length > 0) {
        symKeys.forEach(symKey => {
            cloneObj[symKey] = isObject(obj[symKey]) ? deepClone(obj[symKey]) : obj[symKey]
        })
    }
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    return cloneObj
}