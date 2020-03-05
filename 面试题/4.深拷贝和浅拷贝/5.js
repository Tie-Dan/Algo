/*
对象成环怎么办？
我们给 test 加一个 loopObj 键，值指向自身：
test.loopObj = test
这时我们使用第一种方法中的 for..in 实现和 Reflect 实现都会栈溢出：

环对象深拷贝报错 
而使用第二种方法也会报错：


但 lodash 却可以得到正确结果：


因为 lodash 使用的是栈把对象存储起来了，如果有环对象，就会从栈里检测到，
从而直接返回结果，悬崖勒马。这种算法思想来源于 HTML5 规范定义的结构化克隆算法，
它同时也解释了为什么 lodash 不对 Error 和 Function 类型进行拷贝。


当然，设置一个哈希表存储已拷贝过的对象同样可以达到同样的目的：
*/


function deepClone(obj, hash = new WeakMap()) {
    if (!isObject(obj)) {
        return obj
    }
    // 查表
    if (hash.has(obj)) return hash.get(obj)

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    // 哈希表设值
    hash.set(obj, cloneObj)

    let result = Object.keys(obj).map(key => {
        return {
            [key]: deepClone(obj[key], hash)
        }
    })
    return Object.assign(cloneObj, ...result)
}

//这里我们使用 WeakMap 作为哈希表，因为它的键是弱引用的，而我们这个场景里键恰好是对象，需要弱引用。