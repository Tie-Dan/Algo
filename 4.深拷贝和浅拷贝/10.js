/* 
1. 日常深拷贝，建议序列化反序列化方法。
2. 面试时遇见面试官搞事情，写一个能拷贝自身可枚举、自身不可枚举、自身 Symbol 类型键、原型上可枚举、原型上不可枚举、原型上的 Symol 类型键，循环引用也可以拷的深拷贝函数：
3. 有特殊需求的深拷贝，建议使用 lodash 的 copyDeep 或 copyDeepWith 方法。
*/
// 将之前写的 deepClone 函数封装一下
function cloneDeep(obj) {
    let family = {}
    let parent = Object.getPrototypeOf(obj)

    while (parent != null) {
        family = completeAssign(deepClone(family), parent)
        parent = Object.getPrototypeOf(parent)
    }

    // 下面这个函数会拷贝所有自有属性的属性描述符,来自于 MDN
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    function completeAssign(target, ...sources) {
        sources.forEach(source => {
            let descriptors = Object.keys(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
                return descriptors
            }, {})

            // Object.assign 默认也会拷贝可枚举的Symbols
            Object.getOwnPropertySymbols(source).forEach(sym => {
                let descriptor = Object.getOwnPropertyDescriptor(source, sym)
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor
                }
            })
            Object.defineProperties(target, descriptors)
        })
        return target
    }

    return completeAssign(deepClone(obj), family)
}