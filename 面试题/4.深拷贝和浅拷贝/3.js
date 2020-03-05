// 序列化反序列化法 使用JSON对象的parse和stringify方法来实现深拷贝
function deepClone(obj) {
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}
let obj1 = {
    a: {
        b: 1
    }
};
Object.defineProperty(obj1, 'innumerable', {
    value: '不可枚举属性',
    enumerable: false
});
let obj2 = deepClone(obj1)
console.log(obj1)
console.log(obj2)
// 它也只能深拷贝对象和数组，对于其他种类的对象，会失真。
// 这种方法比较适合平常开发中使用，因为通常不需要考虑对象和数组之外的类型。

// 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失
// 无法拷贝不可枚举的属性， 无法拷贝对象的原型链
// 拷贝Date引用类型会变成字符串
// 拷贝RegExp引用类型会变成空对象
// 对象中含有NaN、 Infinity和 - Infinity， 则序列化的结果会变成null
// 无法拷贝对象的循环应用(即obj[key] = obj)