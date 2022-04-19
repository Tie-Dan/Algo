// 监听的数据
let obj = {
    name: '铁蛋儿',
    age: 1,
    arr: ['张三', '李四', '王五'],
    job: {
        code: 'FE'
    }
}

// 封装监听数据变化的函数
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
    for (const key in obj) {
        // 给对象中的每一项都设置响应式
        defineProperty(obj, key, obj[key])
    }
}

observer(obj)


// obj.name = '小白龙'

// obj.job.code = 'server'

// obj.name = {
//     sname: '欧巴'
// }
// obj.name.sname = '欧巴铁蛋儿'

obj.arr[3] = 1
// obj.arr.push([1,[2,[3]]])