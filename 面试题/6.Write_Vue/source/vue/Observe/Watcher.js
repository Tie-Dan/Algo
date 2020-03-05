import {
    pushTarget,
    popTarget
} from "./dep"
import {
    util
} from "./util"


let id = 0
class Watcher {
    constructor(vm, exprOrfn, cb = () => {}, opts = {}) {

        this.vm = vm
        this.exprOrfn = exprOrfn
        this.cb = cb
        this.deps = []
        this.depsId = new Set()
        this.id = id++
        this.lazy = opts.lazy
        this.dirty = this.lazy
        if (typeof exprOrfn === 'function') {
            this.getter = exprOrfn
        } else {
            // 现在 exprOrfn 是我们传进来的key
            this.getter = function () {
                return util.getValue(vm, exprOrfn)
            }
        }
        this.value = this.lazy ? undefined : this.get() // 老实
        if (opts.user) {
            this.user = true
        }
        // 如果当前是我们的计算属性的话 不会默认调用get方法
    }
    evalValue() {
        this.value = this.get()
        this.dirty = false
    }
    get() {
        // 渲染watcher 
        pushTarget(this) // Dep.target = watcher
        let value = this.getter.call(this.vm) // 当获取属性的时候 
        popTarget()
        return value
    }
    update() {
        // 批量更新 防止重复渲染
        if (this.lazy) {
            this.dirty = true
        } else {
            queueWatcher(this)
        }

        //  this.get()
    }
    run() {
        let value = this.get()
        if (this.value !== value) {
            this.cb(value, this.value)
        }
    }
    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            // 当前的watcher记住当前的dep
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    depend() {
        let i = this.deps.length;
        while (i--) {
            this.deps[i].depend()
        }
    }
}
let has = {}
let queue = []

function flusqueue() {
    queue.forEach(watcher => watcher.run())
    has = {}
    queue = []
}

function queueWatcher(watcher) {
    let id = watcher.id
    if (has[id] == null) {
        has[id] = true
        queue.push(watcher)
    }
    nextTick(flusqueue)
}
let callbacks = []

function flushCallbacks() {
    callbacks.forEach(cb => cb())
}

function nextTick(flusqueue) {
    callbacks.push(flusqueue)
    let asyncFn = () => {
        flushCallbacks()
    }
    if (Promise) {
        Promise.resolve().then(asyncFn)
    }
    setTimeout(asyncFn, 0)
}

export default Watcher