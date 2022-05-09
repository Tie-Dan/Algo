let obj = {
    a: 1,
    b: {
        c: 1
    }
}
let obj2 = {
    ...obj
};
obj.a = 2;
console.log(obj); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}

obj.b.c = 2;
console.log(obj); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}