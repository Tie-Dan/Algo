// let pro = new Proxy(target, handler);
// new Proxy相当于创建了一个Proxy实例，
// target为所要拦截的目标对象，
// handler也是一个对象， 里面定义的是对拦截对象所要进行的拦截方法。

// 针对对象: 针对整个对象,而不是对象的某个属性
// 支持数组: 不需要对数组的方法进行重载,省去了重写数组的方法
// 嵌套支持: get里面递归调用Proxy并返回
// 不需要对keys 进行遍历。这解决Object.defineProperty() 的第二个问题.Proxy 是针对整个 obj 的。
// 所以 obj 内部包含的所有的 key ，都可以走进 set。(省了一个 Object.keys() 的遍历)


// 另外 Reflect.get 和 Reflect.set 可以理解为类继承里的super，即调用原来的方法


// Reflect.get():获取对象身上某个属性的值，类似于 target[name]。
// Reflect.set():将值分配给属性的函数,返回一个Boolean，如果更新成功，则返回true
let obj = {
    name: '铁蛋儿',
    age: 30
}
let handler = {
    get(target, key, receiver) {
        console.log('get', key)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        console.log('set', key, value)
        return Reflect.set(target, key, value, receiver)
    }
}
let proxy = new Proxy(obj, handler)
proxy.name = '小白龙' // set name 小白龙
proxy.age = 18 // set age 18