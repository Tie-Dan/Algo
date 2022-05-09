## 28. 手写call函数（百度）

### 1. call方法简介

- call() 方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数。
- call() 允许为不同的对象分配和调用属于一个对象的函数/方法。
- call() 提供新的this值给当前调用的函数/方法。

- 可以使用call来实现继承，让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

**语法:**

> function.call(thisArg, arg1, arg2, ...)

**参数:**

- thisArg
  可选的。在function函数运行时使用的this值。请注意，this可能不是该方法看到的实际值：如果这个函数处于==非严格模式==下，则指定为null或undefined时会自动替换为指向全局对象，原始值会被包装。

- arg1, arg2, ...
  指定的参数列表。

- 返回值
  使用调用者提供的this值和参数调用该函数的返回值。若该方法没有返回值，则返回undefined。

### 2. 实现call方法

**思路如下：**

所有函数都可以调用，所以应该将该方法添加到Function的原型对象上，该方法传入两个参数：

   ```js
   Function.prototype.mycall = function (thisArg, ...args) {
     // ...
   }
   ```

第一个参数thisArg是在function函数运行时使用的this值，如果thisArg为null或undefined时，则thisArg指向window:

 ```js
 Function.prototype.mycall = function (thisArg, ...args) {
   // thisArg为null或undefined时默认指向window
   thisArg = thisArg || window;
 }
 ```

当然你也可以这样写:

```js
// thisArg为null或undefined时默认指向window
Function.prototype.mycall = function (thisArg = window, ...args) {
  // ...
}
```
如果想把函数中的this变成我们指定的thisArg，实现方法是将该函数作为属性添加到thisArg上，然后调用它。

```js
// thisArg为null或undefined时默认指向window
Function.prototype.mycall = function (thisArg = window, ...args) {
  // 将函数作为属性添加到thisArg上
  thisArg.fn = this;
}
```

call的返回值是使用调用者提供的this值和参数调用该函数的返回值，因此我们需要返回该值：

  ```js
  // thisArg为null或undefined时默认指向window
  Function.prototype.mycall = function (thisArg = window, ...args) {
    // 将函数作为属性添加到thisArg上
    thisArg.fn = this;
    // 执行thisArg.fn, 并返回返回值
    return thisArg.fn(...args);
  }
  ```

最后，我们需要清除thisArg上的该属性以避免污染thisArg。需要注意的是，return必须在delete之后（否则不会执行delete），这样一来，我们需要先将返回值存储起来，然后再在delete执行完后将该值返回出去：

```js
// thisArg为null或undefined时默认指向window
Function.prototype.mycall = function (thisArg = window, ...args) {
  // 将函数作为属性添加到thisArg上
  thisArg.fn = this;
  // 执行thisArg.fn, 并储存返回值
  let res = thisArg.fn(...args);
  // 删除该方法以避免对传入对象造成污染
  delete thisArg.fn;
  // 返回函数执行的返回值
  return res;
}
```

### 3.使用mycall

**情景1：**普通函数

```js
let tiedan = {
  name: 'tiedan'
}

let xiaobailong = {
  name: 'xiaobailong',
  intr(...args) {
    console.log('hello, myname is ' + this.name);
    return Array.from(args).reduce((total, item) => total + item, 0);
  }
}

let res = xiaobailong.intr.mycall(tiedan, 1, 2, 3, 4, 5);  // 'hello, myname is tiedan'    
console.log(res);  // 15
```
**情景2：** 构造函数
    

```js
let Animal = function(name) {
  this.name = name;
}

let Cat = function(name, color) {
  Animal.mycall(this, name);
  this.color = color;
}

let cat = new Cat('tom', 'red');

console.log(cat);   // Cat {name: "tom", color: "red"}
```
这里实现了自己的mycall方法，它接受和call相同的参数，具备改变普通函数和构造函数那中this指向的功能。

但这其中有个小问题，如果thisArg本身就有个fn方法，那就可能造成**覆盖**了。那该如何来解决这个问题呢？

换言之，有没有某种操作，具有独一无二的特性，可以避免和任何属性重名？

有，那就是ES6中新添加的基础数据类型：**Symbol**。

**使用Symbol解决冲突:**

*ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。*

在上面的基础上，我们执行如下代码，发现程序报错了：

```js
let tiedan = {
  name: 'tiedan',
  // 声明了一个_fn方法
  _fn() {
    console.log('tiedan._fn', 1);
  }
}

tiedan._fn();  // tiedan._fn, 1
xiaobailong.intr.mycall(tiedan, 1, 2, 3, 4, 5);  // 'hello, myname is tiedan'  
// 发生了属性覆盖，污染了源对象。
tiedan._fn();  // TypeError: xiaohua._fn is not a function
```
这是因为我们实现的mycall是使用_fn字面量来命名的，所以在对于原来就有_fn属性的
方法来说，会修改和删除这个属性，从而导致报错。我们也不能强迫开发者不使用_fn来作为属性名，因此，可以考虑采用symbol类型来创造一个唯一的属性值。

```js
Function.prototype.mycall = function (thisArg = window, ...args) {
  // 创建一个独一无二的symbol：fn
  let fn = Symbol('thisFn');
  // 将fn作为属性添加到thisArg上
  // 请注意，只能使用[]来添加和读取变量属性
  thisArg[fn] = this;
  // 执行thisArg[fn], 并储存返回值
  let res = thisArg[fn](...args);
  // 删除该方法以避免对传入对象造成污染
  delete thisArg[fn];
  // 返回函数执行的返回值
  return res;
}
```
现在，我们创建了一个不会和任何属性重名的属性，我们来试试效果：

```js
let tiedan = {
  name: 'tiedan',
  fn() {
    console.log('tiedan.fn', 1);
  }
}

tiedan.fn();  // xiaohua.fn, 1
let res = xiaobailong.intr.mycall(tiedan, 1, 2, 3, 4, 5);  // 'hello, myname is tiedan'    
console.log(res);  // 15
// symbol不和任何属性重名，不会污染源对象
tiedan.fn();  // tiedan.fn, 1
```
### 4.总结

1. 获取所有参数，使用展开语法（ES6），当然还有一种实现思路——arguments 对象；

2. 在thisArg为null或undefined时将其指向window，这里可以使用逻辑或，也可以使用默认参数（ES6）；

3. 使函数中的this指向thisArg，实现思路是将其作为属性添加到thisArg上，为了保证不污染thisArg，在调用完后需要将其删除——使用delete操作符；

4. 返回函数执行后的返回值，但返回只能后于delete执行，因此，需要先将返回值存储起来；

5. 使用symbol变量以避免变量重名，这里要用到计算属性名；

6. 当函数为构造函数时，手动实现的call方法不会出现问题，因此不需要考虑这个因素。但bind时就需要考虑这种特殊情况了。

**全部代码:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="./myicon.ico">
  <title>手写call</title>
</head>
  <body>
    <script>
    // Function.prototype.call方法
    // 接受 1+ 个参数
    // 第一个参数指明了调用call方法的函数中this的指向
    // 后面的参数作为调用call方法的函数的参数
    // 如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象
    // 使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。
      // thisArg为null或undefined时默认指向window
Function.prototype.mycall = function (thisArg = window, ...args) {
  // 创建一个独一无二的symbol：fn
  let fn = Symbol('thisFn');
  // 将fn作为属性添加到thisArg上
  thisArg[fn] = this;
  // 执行thisArg[fn], 并储存返回值
  let res = thisArg[fn](...args);
  // 删除该方法以避免对传入对象造成污染
  delete thisArg[fn];
  // 返回函数执行的返回值
  return res;
}
      // 情景1：普通函数
let xiaohua = {
  name: 'xiaohua',
  fn() {
    console.log('xiaohua.fn', 1);
  }
}
let xiaohuang = {
  name: 'xiaohuang',
  intr(...args) {
    console.log('hello, myname is ' + this.name);
    return Array.from(args).reduce((total, item) => total + item, 0);
  }
}
xiaohua.fn();  // xiaohua.fn, 1
let res = xiaohuang.intr.mycall(xiaohua, 1, 2, 3, 4, 5);  // 'hello, myname is xiaohua'    
console.log(res);  // 15
// symbol不和任何属性重名，不会污染源对象
xiaohua.fn();  // xiaohua.fn, 1
// 情景2： 构造函数
let Animal = function (name) {
  this.name = name;
}
let Cat = function (name, color) {
  Animal.mycall(this, name);
  this.color = color;
}
let cat = new Cat('tom', 'red');
console.log(cat);   // Cat.{name: "tom", color: "red"}
  </script>
</body>
</html>


```











