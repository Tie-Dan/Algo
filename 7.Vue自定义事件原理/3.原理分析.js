// 事件中心
vm._events = {
    a: [fn],
    b: [fn, fn]
}
Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
            vm.$on(event[i], fn);
        }
    } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
    }
    return vm
};

Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event]; // 根据事件名找对应数组也是回调集合
    if (cbs) {
        var args = toArray(arguments, 1);
        for (var i = 0, l = cbs.length; i < l; i++) {
            cbs[i].apply(vm, args)
        }
    }
    return vm
};
// 监听事件
vm.$on(['a', 'b'], function (data) {
    // data是传过来的数据
})
vm.$on('b', function (data) {
    // data是传过来的数据
})
// 触发事件
vm.$emit('b', this.data)