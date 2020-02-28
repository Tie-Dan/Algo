// on是订阅 emit是发布
let e = {
    _callback: [],
    on(callback) {
        // 订阅一件事 当这件事发生的时候 触发对应的函数
        // 订阅 就是将函数放到数组中
        this._callback.push(callback);
    },
    emit(value) {
        this._callback.forEach(method => {
            method(value);
        });
    }
};
// 订阅
e.on(function (value) {
    console.log(value + ":张三的订阅");
});
// 订阅
e.on(function (value) {
    console.log(value + ":李四的订阅");
});
// 订阅
e.on(function (value) {
    console.log(value + ":王五的订阅");
});
// 发布
e.emit('发布')