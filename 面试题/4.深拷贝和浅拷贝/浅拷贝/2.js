var obj1 = {
    a: {
        b: 1
    },
    sym: Symbol(1)
};
Object.defineProperty(obj1, 'innumerable', {
    value: '不可枚举属性',
    enumerable: false
});
var obj2 = {};

Object.assign(obj2, obj1)

obj1.a.b = 2;
console.log('obj1', obj1);
console.log('obj2', obj2);