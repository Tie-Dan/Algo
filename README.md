## 算法题

> - 栈方法：
>
> 　　　　　　push() 给数组最后添加元素，参数可以是多个，也就添加多个,返回添加后的数组的长度
>
> 　　　　　　pop(),把数组最后一元素删除，返回删掉的元素，该方法没有参数
>
> - 队列方法：
>
> 　　　　　　shift() 删除数组的第一个元素，返回被删除的元素，该方法没有参数
>
> 　　　　　　unshift() 向数组开头添加元素，参数可以是多个，也就添加多个,返回添加后的数组的长度

### 1.算法手写题（数组扁平）

> 已知如下数组：
>
> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

1. 递归

   ```js
   function spreadArr(arr=[]){
   	if(arr.some(ele=>Array.isArray(ele))){
   		let newArr = [];
   		arr.forEach((ele) => {
   			if(Array.isArray(ele)){
   				newArr = newArr.concat(...ele)
   			}else{
   				if(!newArr.includes(ele)) newArr.push(ele)
   			}
   		})
   		return spreadArr(newArr);
   	}
   	return arr.sort((a,b)=> a-b);
   }
   spreadArr([ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]);
   ```

2. Es6的新语法

   ```js
   var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
   // 扁平化方法flat
   // let flatArr = arr.flat(4)      
   //  flat方法参数可以固定填固定值 
   //  不固定参数是Infinity关键字
   //  flat()方法会跳过空位
   let flatArr = arr.flat(Infinity) 
   // 去重
   let disArr = Array.from(new Set(flatArr))
   // 排序
   let result = disArr.sort(function(a, b) {
       return a-b
   })
   console.log(result)// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
   ```

### 2. 介绍下深度优先遍历和广度优先遍历，如何实现？

#### 深度优先遍历（DFS）

如图:

​	

- 深度![DFS](DFS.png)优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
- 深度优先采用的是堆栈的形式, 即先进后出

#### 广度优先遍历（BFS）

如图:

​	![BFS](BFS.png)

- 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点

- 广度优先则采用的是队列的形式, 即先进先出

  参详code实现

### 3.手写观察者和发布订阅者模式

- 实现发布订阅模式 

  - 订阅一件事当这件事发生的时候 触发对应的函数
  - 订阅是on 发布是emit  Promise内部也是基于发布订阅者
  - 订阅和发布没有任何关系

  ```js
  let fs = require("fs");
  // on是订阅 emit是发布
  let e = {
    _obj: {},
    _callback: [],
    on(callback) {
      // 订阅一件事 当这件事发生的时候 触发对应的函数
      // 订阅 就是将函数放到数组中
      this._callback.push(callback);
    },
    emit(key, value) {
      this._obj[key] = value; // 让订阅的数组中的方法，依次执行
      this._callback.forEach(method => {
        method(this._obj);
      });
    }
  };
  // 只要发布了就执行以下
  e.on(function(obj) {
    // 每次发布都会触发此函数
    console.log("获取一个");
  });
  e.on(function(obj) {
    // 每次发布都会触发此函数
    if (Object.key(obj).length === 2) {
      // 用户根据结果决定输出
      console.log(obj);
    }
  });
  fs.readFile("./age.txt", "utf8", function(error, data) {
    e.emit("age", data);
  });
  fs.readFile("./name.txt", "utf8", function(error, data) {
    e.emit("name", data);
  });
  
  ```

- 实现观察者模式

  - 观察者和被观察者是有关联的，观察者需要将自己放到被观察者之上，当被观察者状态发生变化，需要通知所有的观察者

  ```js
  // 被观察者 （小宝宝）
  class Subject {
    constructor(name) {
      this.name = name;
      this.state = "开心"; // 被观察者的状态
      this.observers = []; // 存放观察者
    }
    // 需要将注册者放到自己的身上
    attach(ther) {
      this.observers.push(ther);
    }
    // 更新被观察者的状态
    setState(state) {
      this.state = state;
      this.observers.forEach(ther => {
        ther.update(this);
      });
    }
  }
  // 观察者
  class Observer {
    constructor(name) {
      this.name = name;
    }
    // 等会被观察者的状态发生变化会调用这个方法
    update(subject) {
      console.log(this.name + ":" + subject.name + "当前状态是" + subject.state);
    }
  }
  let bady = new Subject("小宝宝");
  let father = new Observer("爸爸");
  let mother = new Observer("妈妈");
  bady.attach(father);
  bady.attach(mother);
  bady.setState("不开心");
  bady.setState("饿了");
  
  ```

### 4. 实现深浅拷贝

> JavaScript的数据类型分为基本数据类型和引用数据类型。
>
> 对于基本数据类型的拷贝，并没有深浅拷贝的区别，我们所说的深浅拷贝都是对于引用数据类型而言的。

**浅拷贝**

浅拷贝的意思就是只复制引用，而未复制真正的值

**深拷贝**

深拷贝就是对目标的完全拷贝，不像浅拷贝那样只是复制了一层引用，就连值也都复制了

只要进行了深拷贝，它们老死不相往来，谁也不会影响谁

目前实现深拷贝的方法不多，主要是两种：

1. 利用 JSON 对象中的 parse 和 stringify (如果对象中含有一个函数时，就不能用这个方法进行深拷贝)

2. 利用递归来实现每一层都重新创建对象并赋值

   ```js
   function deepClone(source){
       // 判断复制的目标是数组还是对象
    const targetObj = source.constructor === Array ? [] : {}
     // 遍历目标
    for(let keys in source){
    	if(source.hasOwnProperty(keys)){
            // 如果值是对象，就递归一下
           if(source[keys] && typeof source[keys] === 'object'){
               targetObj[keys] = source[keys].constructor === Array ? [] : {};
               targetObj[keys] = deepClone(source[keys]);
           }else{ 
               // 如果不是，就直接赋值
               targetObj[keys] = source[keys];
           }
   	 } 
    }
    return targetObj;
   }
   ```

- concat 只是对数组的第一层进行深拷贝

- slice 只是对数组的第一层进行深拷贝

- Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值

- ... 实现的是对象第一层的深拷贝。后面的只是拷贝的引用值

**总结：**

1. 赋值运算符 = 实现的是浅拷贝，只拷贝对象的引用值
2. JavaScript 中数组和对象自带的拷贝方法都是“首层浅拷贝”
3. JSON.stringify 实现的是深拷贝，但是对目标对象有要求
4. 若想真正意义上的深拷贝，请递归

### 5. 手写实现promise(超级简易版)

```js
/* 
Promise类系统自带,类中需要传入一个executor执行器，默认立即执行
Promise类内部会提供两个方法 resolve（成功）、reject（失败） ,可以更改promise的3个状态: （等待、成功、失败）
 */
// 宏变量 
const PENDING = 'PENDING' // 等待
const RESOLVE = 'RESOLVE' // 成功
const REJECT = 'REJECT' // 失败
class Promise {
    constructor(executor) {
        this.status = PENDING // 默认是等待状态
        this.value = undefined // 成功的原因
        this.reason = undefined // 失败的原因
        /* 
        只有在pending状态下 才会转向成功或者失败
        保证状态只有pending下 才能改变
        */
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVE
            }

        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECT
            }

        }
        // 执行executor 传入成功和失败
        try {
            executor(resolve, reject) // 立即执行
        } catch (e) {
            console.log('catch' + e)
            reject(e); // 如果出现错误手动调用reject向下传递
        }
    }
    then(onfulfilled, onrejected) {
        if (this.status === RESOLVE) {
            onfulfilled(this.value)
        }
        if (this.status === REJECT) {
            onrejected(this.reason)
        }
    }
}
module.exports = Promise
```

### 6. 手写防抖和截流

### 7. 手写实现diff算法

### 8. 手写实现redux

