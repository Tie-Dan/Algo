// 循环递归法2
function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
}

function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [...obj] : {
        ...obj
    }
    // Reflect.ownKeys 返回对象的所有属性
    Reflect.ownKeys(cloneObj).forEach(key => {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return cloneObj
}

let sym = Symbol('我是一个Symbol')
let obj1 = {
    a: {
        b: 1,

    },
}
obj1[sym] = 111
let obj2 = deepClone(obj1)
console.log(obj1)
console.log(obj2)