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


const obj = {
    a: 1
}
obj.loopObj = obj
const obj1 = deepClone(obj)

console.log(obj1)
// 循环递归法 function、Date、RegExp 和Error无法复制，因为它们有特殊的构造函数。
// 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失
// 无法拷贝不可枚举的属性， 无法拷贝对象的原型链
// 拷贝Date引用类型会变成字符串
// 拷贝RegExp引用类型会变成空对象
// 对象中含有NaN、 Infinity和 - Infinity， 则序列化的结果会变成null
// 无法拷贝对象的循环应用(即obj[key] = obj)