import {
    observe
} from "."
import {
    arrayMethods,
    observerArray,
    dependArray
} from "./array"
import Dep from "./dep"

class Observe {
    constructor(data) { // data 就是 vue里面的我们定义的data vm._data
        // 将用户的数据使用defineProperty定义
        // 创建数组专用的dep
        this.dep = new Dep()
        // 给每个对象包括我们数组添加一个属性 __ob__属性
        Object.defineProperty(data, '__ob__', {
            get: () => this
        })
        if (Array.isArray(data)) {
            data.__proto__ = arrayMethods
            // 只能拦截数组的方法 数组里的每一项还要去监听 有可能是对象
            observerArray(data)
        } else {
            this.walk(data)
        }
    }
    walk(data) {
        let keys = Object.keys(data)

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i] // 所有的key
            let value = data[keys[i]] // 所有的value
            defineReactive(data, key, value)
        }
    }
}
export function defineReactive(data, key, value) {

    // 观察value是不是一个对象然后监听 如果是一个对象递归监听
    let childOb = observe(value)
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                // wacher里面记录dep 也要在dep
                dep.depend()
                // dep.addSub(watcher)
                if (childOb) {
                    childOb.dep.depend() // 数组收集当前渲染的watcher
                    dependArray(value) // 收集儿子的依赖
                }
            }
            return value
        },
        set(newValue) {
            console.log('设置数据')
            if (newValue === value) return
            // 有可能你设置的时候 也是一个对象 
            observe(newValue)
            value = newValue
            // 当属性设置的时候 实现更新
            dep.notify()
        }
    })
}
export default Observe