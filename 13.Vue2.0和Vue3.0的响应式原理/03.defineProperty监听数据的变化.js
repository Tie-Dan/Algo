// Object.defineProperty 是对象的方法监听不到数组的变更的 Vue2.x的做法是重写数组的7个方法
// 封装监听数据变化的函数
let obj = {
    name: '铁蛋儿',
    age: 1,
    arr: ['张三', '李四', '王五'],
    job: {
        code: 'FE'
    }
}
const arrayMethods = Array.prototype;
// 先克隆一份Array的原型出来
const arrayProto = Object.create(arrayMethods);
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(method => {
    arrayProto[method] = function () {
        // 执行原始操作
        arrayMethods[method].apply(this, arguments)
        console.log('监听赋值成功', method)
    }
})

function defineProperty(obj, key, val) {
    observer(val)
    Object.defineProperty(obj, key, {
        get() {
            // 读取方法
            console.log('读取', key, '成功')
            return val
        },
        set(newval) {
            // 赋值监听方法
            if (newval === val) return
            // 遍历监听数据的每一项 
            observer(newval)
            console.log('监听赋值成功', newval)
            val = newval
            // 可以执行渲染操作
        }
    })
}

function observer(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    if (Array.isArray(obj)) {
        // 如果是数组, 重写原型
        obj.__proto__ = arrayProto
        // 传入的数据可能是多维度的,也需要执行响应式
        for (let i = 0; i < obj.length; i++) {
            observer(obj[i])
        }
    } else {
        for (const key in obj) {
            // 给对象中的每一个方法都设置响应式
            defineProperty(obj, key, obj[key])
        }
    }
}

observer(obj)

obj.arr.push(4)