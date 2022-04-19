// Proxy 也是不支持嵌套的， 这点和 Object.defineProperty() 是一样的。
// 因此也需要通过逐层遍历来解决。 Proxy 的写法是在 get 里面递归调用 Proxy 并返回
let obj = {
    info: {
        name: '铁蛋儿',
        blogs: ['webpack', 'gulp', 'babel']
    }
}
let handler = {
    get(target, key, receiver) {
        console.log('get', key)
        // 递归创建并返回
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        console.log('set', key, value)
        return Reflect.set(target, key, value, receiver)
    }
}
let proxy = new Proxy(obj, handler)
// 以下两句都能够进入 set
proxy.info.name = '小白龙'