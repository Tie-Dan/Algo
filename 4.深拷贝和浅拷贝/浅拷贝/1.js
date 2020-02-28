let target = {}
let obj = {
    a: {
        b: 3
    }
};
Object.assign(target, obj);
console.log(target); //{a:1}

obj.a.b = 1;

console.log(obj); //{a:2}
console.log(target); //{a:1}