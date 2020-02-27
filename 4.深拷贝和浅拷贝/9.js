// 需要拷贝不可枚举的属性
// 第四种情况， 就是我们需要拷贝类似属性描述符， setters 以及 getters 这样不可枚举的属性， 一般来说， 这就需要一个额外的不可枚举的属性集合来存储它们。 类似在第二种情况使用
// for... in 拷贝 Symbol 类型键时：
// 我们给 test 变量里的 obj 和 arr 属性定义一下属性描述符：
Object.defineProperties(test, {
    'obj': {
        writable: false,
        enumerable: false,
        configurable: false
    },
    'arr': {
        get() {
            console.log('调用了get')
            return [1, 2, 3]
        },
        set(val) {
            console.log('调用了set')
        }
    }
})
// 然后实现我们的拷贝不可枚举属性的版本：
function deepClone(obj, hash = new WeakMap()) {
    if (!isObject(obj)) {
        return obj
    }
    // 查表，防止循环拷贝
    if (hash.has(obj)) return hash.get(obj)

    let isArray = Array.isArray(obj)
    // 初始化拷贝对象
    let cloneObj = isArray ? [] : {}
    // 哈希表设值
    hash.set(obj, cloneObj)
    // 获取源对象所有属性描述符
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    // 获取源对象所有的 Symbol 类型键
    let symKeys = Object.getOwnPropertySymbols(obj)
    // 拷贝 Symbol 类型键对应的属性
    if (symKeys.length > 0) {
        symKeys.forEach(symKey => {
            cloneObj[symKey] = isObject(obj[symKey]) ? deepClone(obj[symKey], hash) : obj[symKey]
        })
    }

    // 拷贝不可枚举属性,因为 allDesc 的 value 是浅拷贝，所以要放在前面
    cloneObj = Object.create(
        Object.getPrototypeOf(cloneObj),
        allDesc
    )
    // 拷贝可枚举属性（包括原型链上的）
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key];
    }

    return cloneObj
}