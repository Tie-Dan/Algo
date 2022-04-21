## 01. 深度优先遍历(DFS) 和 广度优先遍历(BFS)

> 面试题:
>
> ​	给定一个二叉树，使用 DFS 和 BFS 遍历返回所有节点。 

#### 深度优先遍历（DFS）

![DFS](https://tva1.sinaimg.cn/large/e6c9d24ely1h0we46up81j20dm085jrs.jpg)

- DFS 的思想是从上至下，对每一个分支一直往下一层遍历直到这个分支结束，然后返回上一层，对上一层的右子树这个分支继续深搜，直到一整棵树完全遍历，因此符合栈**后进先出**的特点

- 深度优先遍历常用的数据结构是**栈**

- DFS 特性 : 不全部保留结点，占用空间少;有回溯操作(即有入栈、出栈操作)，运行速度慢。

  ```js
       // 广度优先遍历  队列
          let bfs = (node) => {
              let stack = [] // 队列
              let nodes = [] // 返回的节点
              if (node) {
                  stack.push(node)
                  while (stack.length) {
                      let item = stack.shift() // 从前面去
                      nodes.push(item)
                      let children = item.children
                      for (let i = 0; i < children.length; i++) {
                          stack.push(children[i])
                      }
                  }
              }
              return nodes
          }
          console.log(bfs(node_prent))
  ```

  

#### 广度优先遍历（BFS）

![BFS](https://tva1.sinaimg.cn/large/e6c9d24ely1h1f5do85i6j20cj07v74l.jpg)

- BFS 的思想是从左至右，对树的每一层所有结点依次遍历，当一层的结点遍历完全后，对下一层开始遍历，而下一层结点又恰好是上一层的子结点。因此符合队**列先进先出**的特点
- 深度优先遍历常用的数据结构为队列
- BFS 的特性 : 保留全部结点，占用空间大;无回溯操作(即无入栈、出栈操作)，运行速度快。 

## 02. 发布订阅者和观察者

![ss](https://tva1.sinaimg.cn/large/e6c9d24ely1h1f7fk0a6jj20fe0acjs7.jpg)

**观察者模式：**观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

**发布订阅模式：**订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

## 03. 防抖和截流 

在开发的过程中，我们经常会需要绑定一些持续触发的事件，如 resize、scroll、mousemove 等等，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数浪费性能。

#### 防抖（debounce）

> 指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

一个频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效。

原理：在第一次调用函数的时候，创建一个定时器，在指定的时间间隔之后运行代码；如果代码还没运行时，又触发了该函数，则清除旧的定时器，重新创建新的定时器；如果超过延时执行的时间，代码执行了，则此时已经是第二次触发；

- earch搜索联想，用户在不断输入值时，用防抖来节约请求资源。
- window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

#### 节流（throttle）

> 指连续触发事件但是在 n 秒中只执行一次函数

一个频繁触发的函数，在规定时间内，函数执行一次后，只有大于设定的执行周期后才会执行第二次。

原理：第一次执行函数的时候，记录函数执行的时间，当下一次执行的时候，比较时间是否还在间隔时间内，如果是则不执行，否则继续执行；

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)
- 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

**函数防抖和节流，都是控制事件触发频率的方法。应用场景有很多，输入框持续输入，将输入内容远程校验、多次触发点击事件、onScroll等等。**

## 04. 浅拷贝和深拷贝

**浅拷贝：**仅仅是指向被复制的内存地址，如果原地址发生改变，那么浅复制出来的对象也会相应的改变。

> 创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

**深拷贝：**在计算机中开辟一块**新的内存地址**用于存放复制的对象。

> 将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

**深拷贝和浅拷贝最根本的区别在于是否是真正获取了一个对象的复制实体，而不是引用。**

**浅拷贝实现方法:**

1. Object.assign

   - Object.assign是一个浅拷贝,它只是在**根属性**(对象的第一层级)创建了一个新的对象，但是对于属性的值是仍是对象的话依然是浅拷贝

   - 不会拷贝对象继承的属性

   - 不可枚举的属性

   - 可以拷贝Symbol类型

2. 扩展运算符、slice、concat

   - 和assgin一样只拷贝一层

**深拷贝实现方法:**

1. 循环+递归
   - 只能实现object、array的深拷贝
   - for...in 无法获得 Symbol 类型的键，而 Reflect 可以获取

2. JSON.stringify

   - 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失

   - 无法拷贝不可枚举的属性， 无法拷贝对象的原型链

   - 拷贝Date引用类型会变成字符串

   - 拷贝RegExp引用类型会变成空对象

   - 对象中含有NaN、 Infinity和 - Infinity， 则序列化的结果会变成null

   - 无法拷贝对象的循环应用(即obj[key] = obj)

3. lodash([第三方库](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)）

## 05. 介绍下重绘和回流（Repaint & Reflow）,以及如何优化?

#### 1. 浏览器渲染机制

- 浏览器采用流式布局模型（`Flow Based Layout`）
- 浏览器会把`HTML`解析成`DOM Tree`，解析`css`构建`render`树（将css代码解析成树形的数据结构，然后结合DOM合并成render树）
- 有了`RenderTree`，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
- 由于浏览器使用流式布局，对`Render Tree`的计算通常只需要遍历一次就可以完成，**但`table`及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是为什么要避免使用`table`布局的原因之一**。

#### 2. 重绘

​	由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如`outline`, `visibility`, `color`、`background-color`等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。

#### 3. 回流

回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。因为其在DOM中在回流元素之后，**大部分的回流将导致页面的重新渲染，回流必定会发生重绘，重绘不一定会引发回流。**

#### 4. 浏览器优化

现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个浏览器刷新（即16.6ms）才会清空队列，但是当你**获取布局信息的时候 比如`改变元素的宽高`，`元素的位置`，导致浏览器不得不重新计算元素的几何属性，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值并重新构建渲染树**

主要包括以下属性或方法：

- `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
- `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
- `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
- `width`、`height`
- `getComputedStyle()`
- `getBoundingClientRect()`

所以，我们应该避免频繁的使用上述的属性，它们都会强制渲染刷新队列。

#### 5. 减少重绘与回流

1. CSS

   - **使用 `transform` 替代 `top`**

   - **使用 `visibility` 替换 `display: none`** ，因为前者只会引起重绘，后者会引发回流（改变了布局)

   - **避免使用`table`布局**，可能很小的一个小改动会造成整个 `table` 的重新布局。

   - **尽可能在`DOM`树的最末端改变`class`**，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

   - **避免设置多层内联样式**，css 选择符**从右往左**匹配查找，避免节点层级过多,保证**层级扁平**。

   - **将动画效果应用到`position`属性为`absolute`或`fixed`的元素上**，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 `requestAnimationFrame`。

   - **避免使用`CSS`表达式**，可能会引发回流。

   - **CSS3 硬件加速**可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

2. JS

   - **避免频繁操作样式**，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。
   - **避免频繁操作`DOM`**，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。
   - **避免频繁读取会引发回流/重绘的属性**，如果确实需要多次使用，就用一个变量缓存起来。

   - **对具有复杂动画的元素使用绝对定位**，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## 06. Promise 和 Async

1. Promise和Callback有什么区别

   - 深度和宽度的区别都能解决异步
   - Promise是ES6标准提出异步编程解决方案

2. Promise有几个状态

   - pending 等待、fulfilled 成功、rejected 失败

3. Promise构造函数是同步还是异步执行，then那

   - Promise构造函数是同步,then是异步

4. Promise如何实现

5. Promise的优缺点

   **优点**
    promise对象，可以将 **异步操作** 以 **同步操作的流程** 表达出来，避免层层嵌套

   **缺点**

   1. 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
   2. 如果不设置回调函数，Promise 内部抛出的错误，不会反映到外部。
   3. 处于pending状态时，是不能知道目前进展到哪个阶段的 ( 刚开始？，即将结束？)

6. 如何设计Promise.all()

7. Promise怎么异常捕获

   1. reject

   2. catch（推荐）

      > 因为catch可以捕获执行中的错误，也更接近同步的写法(try/catch)

   3. 捕获不了异步错误  因为 try catch只能捕获同步错误

8. Async/Await和Promise的区别

   1. 简洁不用写匿名参数调用
   2. Async/Await让try/catch可以同时处理同步和异步错误
   3. Async/Await可以让程序中断
   4. 条件语句
   5. 错误栈

9. Async/Await内部实现原理

   ​	Generator+CO模块

   1. 内置执行器，不需要使用next()手动执行。
   2. await命令后面可以是Promise对象或原始类型的值，yield命令后面只能是Thunk函数或Promise对象。
   3. 返回值是Promise。返回非Promise时，async函数会把它包装成Promise返回。(Promise.resolve(value))

## 07. Vue自定事件的原理

1. 基本用法

   ```js
   vm.$emit('自定义事件的名称',this.data) // 触发事件
   vm.$on('自定义事件的名称',function(data){}) // 监听事件
   ```

   **注意**:

   ​	 如果是子到父通信 不能用 $on 侦听子组件抛出的事件，而**必须**在模板里直接用 v-on 绑定。
   ​	 就是父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

2. 实现原理

   - 子父通信原理 (观察者模式)

   - 事件总线原理 (发布订阅者模式)

   > on只能监听同一个Vue实例上emit出来的事件，事件总线就是靠这个机制实现数据传递的。
   >
   > 但是父子组件是独立的Vue实例, 所以emit的事件,如果不在使用它的时候监听这个自定义事件，
   >
   > 在父组件里面如果用on是监听不到的, 但是可以在一个组件里面通信(至今没发现有什么用)

## 08. Vue如何优化首页加载

1. 首页白屏原因

   > 主要原因是单页应用,加载资源过慢， 需要将所有需要的资源都下载到浏览器端并解析。单页面应用的html 是靠 js 生成，因为首屏需要加载很大的js文件(`app.js` `vendor.js`)，所以当网速差的时候会产生一定程度的白屏。

2. 首屏优化方法

   1. 在路由返回内容前添加loading(骨架屏)
      - [vue-server-renderer](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Ftree%2Fdev%2Fpackages%2Fvue-server-renderer%23readme)
      - [vue-skeleton-webpack-plugin](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Flavas-project%2Fvue-skeleton-webpack-plugin)
      - [page-skeleton-webpack-plugin](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FElemeFE%2Fpage-skeleton-webpack-plugin)
   2. 使用首屏SSR + 跳转SPA方式来优化
   3. 改单页应用为多页应用,使用quicklink(单页面配合路由)技术
   4. 协议优化(**B站前端铁蛋**儿)
   5. 使用web worker
   6. 第三方资源使用cdn
   7. 优化webpackp配置
      - webpack的code-split结合vue-router做懒加载
      - wepack的contenthash模式,针对文件级别更改做缓存

   8. 图片使用webp、小图采用base64编码、雪碧图等

## 09. React 和 Vue 循环为什么加key？

> 基于没有key的情况diff速度会更快, 没有绑定key的情况下遍历节点的时候,虚拟DOM的新旧节点会复用。

```html
<div id="app">
    <div v-for="i in dataList">{{ i }}</div>
</div>
```

```js
let vm = new Vue({
  el: '#app',
  data: {
    dataList: [1, 2, 3, 4, 5]
  }
})
```

以上的例子，v-for的内容会生成以下的dom节点数组，我们给每一个节点标记一个身份id：

```js
[
  '<div>1</div>', // id： A
  '<div>2</div>', // id:  B
  '<div>3</div>', // id:  C
  '<div>4</div>', // id:  D
  '<div>5</div>'  // id:  E
]
```

**1. 改变dataList数据**

```js
vm.dataList = [5, 4, 3, 1, 2]
// 没有key的情况， 节点位置不变，但是节点innerText内容更新了
  [
    '<div>5</div>', // id： A
    '<div>4</div>', // id:  B
    '<div>3</div>', // id:  C
    '<div>1</div>', // id:  D
    '<div>2</div>'  // id:  E
  ]

// 有key的情况，dom节点位置进行了交换，但是内容没有更新
// <div v-for="i in dataList" :key='i'>{{ i }}</div>
  [
    '<div>5</div>', // id： D
    '<div>4</div>', // id:  A
    '<div>3</div>', // id:  C
    '<div>1</div>', // id:  E
    '<div>2</div>'  // id:  B
  ]
```

**2. 增删dataList数据**

```js
vm.dataList = [3, 4, 5, 6, 7] // 数据进行增删
// 没有key的情况， 节点位置不变，内容也更新了
[
  '<div>3</div>', // id： A
  '<div>4</div>', // id:  B
  '<div>5</div>', // id:  C
  '<div>6</div>', // id:  D
  '<div>7</div>'  // id:  E
]

// 有key的情况， 节点删除了 A, B 节点，新增了 F, G 节点
// <div v-for="i in dataList" :key='i'>{{ i }}</div>
[
  '<div>3</div>', // id： C
  '<div>4</div>', // id:  D
  '<div>5</div>', // id:  E
  '<div>6</div>', // id:  F
  '<div>7</div>'  // id:  G
]
```

​	从以上来看，不带有key，**并且使用简单的模板，**基于这个前提下，可以更有效的复用节点，diff对比也是不带key的快，因为带key在增删节点上有耗时。这就是Vue文档所说的**默认模式**。但是这个并不是key作用，而是没有key的情况下可以对节点就地复用，提高性能。

​	这种模式会带来一些隐藏的副作用，比如可能不会产生过渡效果，或者在某些节点有绑定数据（表单）状态，会出现状态错位。Vue文档也说明了这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态  的列表渲染输出(例如：表单输入值)。

​	为什么还要建议带key呢？因为这种不带key只适用于渲染简单的无状态组件。对于大多数场景来说，列表组件都有自己的状态。

## 10.Vue和React路由实现的原理

> vue-router和react-router实现原理大同小异，更新视图但不重新请求页面是前端路由原理的核心之一，目前在浏览器环境中的实现有2种方式

1. hash模式（老版浏览器支持）

   原理是 onhashchage 事件可以在window对象上监听这个事件

2. History模式(高版本浏览器支持)

   原理是利用History 在 HTML5中新增的方法

**两种方式对比:**

- hash模式
  - 通过路径中的hash值来控制路由跳转，不存在兼容问题

- history
  - 利用了HTML5 History 中新增的 pushState() 方法。
  - 需要后台配置支持。如果刷新时，服务器没有响应响应的资源，会刷出404，

**路由面试题:**

1. Vue路由的实现原理 
2. SPA路由history模式上线后刷新404
   - 在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面。
3. $(route/router)的区别
   - $route是路由信息对象
   - $router是路由实例对象

4. 路由里的 <Link> 标签和 <a> 标签有什么区别

```js
Link 的本质也是a 标签。只不过在Link 中禁用了 a 标签的默认事件，改用了history对象提供的方法进行跳转。
```

**原生实现hash和history两种路由模式:**

​	参照code

## 11. webpack的打包原理

1. 简单需求

   - 浏览器不支持ES6的模块

2. 核心打包功能

   ```js
   // 打包工作的基本流程如下：
   1. 需要读到入口文件里的内容
   2. 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树
   3. 根据AST语法树，生成浏览器能够运行的最终代码
   ```

   1. 获取模块内容
   2. 分析模块内容
      - 安装@babel/parser包（转AST）
   3. 对模块内容处理
      - 安装@babel/traverse包（遍历AST）
      - 安装@babel/core和@babel/preset-env包（Es6转Es5）
   4. 递归所有模块
   5. 生成最终代码

3. 手动loader、plugin

   1. 实现一个同步的loader
   2. 实现一个异步的loader
   3. 实现一个plugin

## 12.webpack配置Vue实现热更新

## 13.Vue 2.0和Vue3.0 响应式原理的区别？ 

#### Object.defineProperty和Proxy区别

1. Object.defineProperty无法监控到数组方法，导致通过数组添加元素，不能实时响应；

2. Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，

   如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，**并返回一个新的对象**。

3. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。 

## 14. 手写 async/await 的实现

> async函数本职上就是generator函数的语法糖，说白了就是co库。
>
> babel编译中generator函数也被编译成了一个很原始的形式，现在用generator替代。 

## 15. 使用ES6提供的构造函数Proxy实现数据绑定

- 详见代码

## 16. 求最大公共前缀

编程题：求最大公共前缀，如`['aaafsd', 'aawwewer', 'aaddfff'] => 'aa'`

## 17. 手写一个redux

- 订阅发布者模式

## 18. 使用setTimeout实现setInterval

## 19. 对象扁平化（2022阿里伯乐）

**输入**：

```JavaScript
{
    a: 'a',
    b: [1, { c: true }, [3]],
    d: { e: undefined, f: 3 },
    g: null,
}
```

**输出**： (null和undefined直接舍去)

```JavaScript
{
    a: "a",
    b[0]: 1,
    b[1].c: true,
    b[2][0]: 3,
    d.f: 3
   
}
```

代码实现

```JavaScript
function flatten(obj) {
  const res = {};
  const _flatten = function (o, prev = null) {
    if (Array.isArray(o)) {
      for (const index in o) {
        const ele = o[index];
        if (ele instanceof Object) {
          _flatten(ele, `${prev ? prev : ''}[${index}]`);
        } else {
          if (ele) {
            res[`${prev ? prev : ''}[${index}]`] = ele;
          }
        }
      }
      return;
    }
    for (const key in o) {
      if (typeof o[key] === 'object') {
        if (o[key] !== null) {
          _flatten(o[key], `${prev ? prev + '.' : ''}${key}`);
        }
      } else {
        if (o[key] !== undefined) {
          res[`${prev ? prev + '.' : ''}${key}`] = o[key];
        }
      }
    }
  };
  _flatten(obj);
  return res;
}
```

## 20. 反转二叉树（知乎）

![img](https://secure2.wostatic.cn/static/9w8Tx657R6QWHXgGdovmTK/image.png)

```JavaScript
const obj = {
  'id': '4',
  'left': {
    'id': '2',
    'left': {
      'id': '1',
      'left': null,
      'right': null
    },
    'right': {
      'id': '3',
      'left': null,
      'right': null
    }
  },
  'right': {
    'id': '7',
    'left': {
      'id': '6',
      'left': null,
      'right': null
    },
    'right': {
      'id': '9',
      'left': null,
      'right': null
    }
  }
}


function invertTree(root) {
  if (root !== null) {
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    invertTree(root.left);
    invertTree(root.right);
  }
  return root
};
console.log(invertTree(obj))
```

## 21. 输出一个字符串全排列（快手）

> 'abc'

> [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

```JavaScript
// 不能有重复元素
let pre = function (s) {
  let res = []
  s = s.split('').sort((a, b) => {
    return a > b ? 1 : -1
  }).join('')
  const dfs = (curr, store) => {
    if (!store.length) {
      return res.push(curr)
    }
    for (let i = 0; i < store.length; i++) {
      if (i > 0 && store[i] === store[i - 1]) continue
      dfs(curr + store[i], store.slice(0, i) + store.slice(i + 1))
    }
  }
  dfs('', s)
  return res
}
```

## 22.  ES5实现B继承A （58同城）

1. 原型链继承

   - 将父类的实例作为子类的原型
     - 优点:
       1. 父类方法可以复用
     - 缺点:
       1. 父类的所有`引用属性`会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
       2. 子类型实例不能给父类型构造函数传参

2. 构造函数继承

   - 在子类构造函数中调用父类构造函数，可以在子类构造函数中使用

     ```
     call()
     ```

     和

     ```
     apply()
     ```

     方法

     - 优点:
       1. 可以在子类构造函数中向父类传参数
       2. 父类的引用属性不会被共享
     - 缺点:
       1. 子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化

3. 组合继承

   - 组合继承综合了`原型链继承`和`构造函数继承`，将两者的优点结合了起来，基本的思路就是使用原型链继承原型上的属性和方法，而通过构造函数继承实例属性，这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

     优点：

     ```
     1.  父类的方法可以复用
     ```

4. 可以在Child构造函数中向Parent构造函数中传参

5. 父类构造函数中的引用属性不会被共享

6. 原型式继承

   - 对参数对象的一种浅复制

     优点：

     1. 父类方法可复用

     缺点：

     1. 父类的引用会被所有子类所共享
     2. 子类实例不能向父类传参

7. 寄生式继承

   - 使用原型式继承对一个目标对象进行浅复制，增强这个浅复制的能力

8. 寄生式组合继承

   优点：

   1. 只调用一次父类构造函数

9. Child可以向Parent传参

10. 父类方法可以复用

11. 父类的引用属性不会被共享

> 寄生式组合继承可以算是引用类型继承的最佳模式

## 23.  手写虚拟 Dom 转化为真实 Dom（滴滴）

```JavaScript
{
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
// 把上诉虚拟Dom转化成下方真实Dom
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
```

## 24. Vue.nextTick的原理和用途

**原理**

1. 异步说明

   > Vue 实现响应式并**不是数据发生变化之后 DOM 立即变化**，而是按一定的策略进行 DOM 的更新。

2. 事件循环说明

   简单来说，Vue在修改数据后，视图不会立刻更新，而是等**同一事件循环**中的所有数据变化完成之后，再统一进行视图更新。

![img](https:////upload-images.jianshu.io/upload_images/6879762-4e28f4ec6177e461.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/866/format/webp)

![img](https:////upload-images.jianshu.io/upload_images/6879762-d362dda15d4cec74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/423/format/webp)

**应用场景**

1. 在Vue生命周期的created()钩子函数进行DOM操作一定要放到Vue.nextTick()的回调函数中。

   在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。

   与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题。

2. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

具体原因在Vue的官方文档中详细解释：

> Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的Promise.then和MessageChannel，如果执行环境不支持，会采用setTimeout(fn, 0)代替。

> 例如，当你设置vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback)。这样回调函数在 DOM 更新完成后就会调用。

**深入理解**

https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js(源码地址)

```JavaScript
  var nextTick = (function () {
    // 这里存放的是回调函数的队列
    var callbacks = [];
    var pending = false;
    var timerFunc;
    //这个函数就是DOM更新后需要执行的
    function nextTickHandler () {
      pending = false;
       //这里将回调函数copy给copies
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      //进行循环执行回调函数的队列
      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
  }
})()
```

Vue用了三个方法来执行`nextTickHandler`函数，分别是：

- `Promise`

```JavaScript
//当浏览器支持Promise的时候就是用Promise
p.then(nextTickHandler).catch(logError);
```

- `MutationObserver`

```JavaScript
//当浏览器支持MutationObserver的时候就是用MutationObserver
var observer = new MutationObserver(nextTickHandler);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
```

- `setTimeout`

```JavaScript
//当以上都不支持的时候就用setTimeout
 setTimeout(nextTickHandler, 0);
```

那么Vue.nextTick([callback, context])的第二个参数是什么呢?来看下面的代码。

```JavaScript
return function queueNextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
  //看这里，其实是可以给cb指定一个对象环境，来改变cb中this的指向
    if (cb) { cb.call(ctx); }
    if (_resolve) { _resolve(ctx); }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}
```

这样写就报错了:

```JavaScript
Vue.nextTick(()=>{
  this.text()
}, { text(){
  console.log('铁蛋儿')
  }
})
```

源码中使用的是`if (cb) { cb.call(ctx) }` 所以不能使用箭头函数，箭头函数的`this`是固定的，是不可用`apply`,`call`,`bind`来改变的。改成这样：

```JavaScript
Vue.nextTick(function () {
  this.text()
}, { 
  text(){
    console.log('铁蛋儿')
  }
})
```

## 25. 两个长度不等的有序数组合并成一个有序数组（ACM、字节、美团）

> 不能使用sort

```JavaScript
let ad = [1,3,5,6,7,13,14,15,16,20,33]
let ap = [3,4,6,8,9,13,17,18,19]
// 合并后的数组有序
let between = []
const transForNew = (ad,ap) => {
  while(ad.length + ap.length > 0){
    if(ad.length < 1 || ap.length < 1){
      between = between.concat(ad.length < 1 ? ap : ad)
      break
    }
    between.push(ad[0] >= ap[0] ? ap.shift() : ad.shift())
  }
  return between
} 
console.log(transForNew(ad,ap));
```

## 26. 控制最大并发数（字节）

```JavaScript
class PromisePool {
  constructor(max, fn) {
    this.max = max; // 最大并发数
    this.fn = fn;   // 自定义的请求函数
    this.pool = []; // 并发池
    this.urls = []; // 剩余的请求地址
  }
  start(urls) {
    this.urls = urls;
    // 先循环把并发池塞满
    while (this.pool.length < this.max) {
      let url = this.urls.shift();
      this.setTask(url);
    }
    // 利用Promise.race 方法来获得并发池中某任务完成的信号
    let race = Promise.race(this.pool);
    return this.run(race);
  }
  run(race) {
    race
      .then(res => {
        // 每当并发池跑完一个任务，就再塞入一个任务
        let url = this.urls.shift();
        this.setTask(url);
        return this.run(Promise.race(this.pool));
      });
  }
  setTask(url) {
    if (!url) return;
    let task = this.fn(url);
    this.pool.push(task); // 将该任务推入pool并发池中
    console.log(`\x1B[43m ${url} 开始，当前并发数：${this.pool.length}`);
    task.then(res => {
      // 请求结束后将该Promise任务从并发池中移除
      this.pool.splice(this.pool.indexOf(task), 1);
      console.log(`\x1B[43m ${url} 结束，当前并发数：${this.pool.length}`);
    });
  }
}
// test
const URLs = [
  'bytedance.com',
  'tencent.com',
  'alibaba.com',
  'microsoft.com',
  'apple.com',
  'hulu.com',
  'amazon.com'
];
let dur = 0;
// 自定义请求函数
let requestFn = url => {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve(`任务 ${url} 完成`);
    }, 1000 * dur++)
  }).then(res => {
    console.log('外部逻辑 ', res);
  })
}

const pool = new PromisePool(3, requestFn); // 并发数为3
pool.start(URLs);
```

## 27. 数组怎么转成tree （字节）

```JavaScript
// 传入一个这样的数据结构
[
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 6, parentId: 3 }
]

// 转化成如下

{
  id: 1,
  children: [
    {
      id: 2,
      children: [
        { id: 4, children: [] },
        { id: 5, children: [] }
      ]
    },
    {
      id: 3,
      children: [
        { id: 6, children: [] }
      ]
    }
  ]
}
```



