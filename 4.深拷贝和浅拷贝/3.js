// 序列化反序列化法 使用JSON对象的parse和stringify方法来实现深拷贝

function deepClone(obj) {
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}
let a = [0, 1, [2, 3], 4],
    b = deepClone(a);
a[0] = 1;
a[2][0] = 1;
console.log(a, b);
// 它也只能深拷贝对象和数组，对于其他种类的对象，会失真。
// 这种方法比较适合平常开发中使用，因为通常不需要考虑对象和数组之外的类型。