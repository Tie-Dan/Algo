/**
Object.defineProperty(obj, prop, descriptor)
参数1:obj: 要在其上定义属性的对象。
参数2:prop: 要定义或修改的属性的名称。
参数3:descriptor: 将被定义或修改的属性的描述符(包含数据描述符和存取描述符)。
**/
//数据描述符
let obj1 = {};
Object.defineProperty(obj1, "key", {
  //该属性对应的值，默认为 undefined。
  value: 1,
  //属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。
  writable: true,
  //属性的 enumerable 为 true 时，
  //该属性才能够出现在对象的枚举属性中。默认为 false。
  enumerable: true,
  //属性的configurable 为 true 时，
  //该属性描述符才能够被改变，也能够被删除。默认为 false。
  configurable: true,
});

console.log(obj1);

// 存取描述符
let obj2 = {};
let value;
Object.defineProperty(obj2, "key", {
  // 数据描述符.....
  get: function () {
    console.log("执行了获取操作");

    return value;
  },
  set: function (newValue) {
    console.log("执行了设置操作");

    value = newValue + "真帅！！！！";
  },
});
//执行get
console.log(obj2.key);
//执行set
obj2.key = "铁蛋儿";