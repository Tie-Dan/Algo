### 01. 深度优先遍历(DFS) 和 广度优先遍历(BFS)

> 面试题:
>
> ​	给定一个二叉树，使用 DFS 和 BFS 遍历返回所有节点。 

#### 深度优先遍历（DFS）

![DFS](img/DFS.png)

- DFS 的思想是从上至下，对每一个分支一直往下一层遍历直到这个分支结束，然后返回上一层，对上一层的右子树这个分支继续深搜，直到一整棵树完全遍历，因此符合栈**后进先出**的特点
- 深度优先遍历常用的数据结构是**栈**
- DFS 特性 : 不全部保留结点，占用空间少;有回溯操作(即有入栈、出栈操作)，运行速度慢。

#### 广度优先遍历（BFS）

![BFS](img/BFS.png)

- BFS 的思想是从左至右，对树的每一层所有结点依次遍历，当一层的结点遍历完全后，对下一层开始遍历，而下一层结点又恰好是上一层的子结点。因此符合队**列先进先出**的特点
- 深度优先遍历常用的数据结构为队列
- BFS 的特性 : 保留全部结点，占用空间大;无回溯操作(即无入栈、出栈操作)，运行速度快。 

## 02. 发布订阅者和观察者

 	![sb](img/sb.png)

**观察者模式：**观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

**发布订阅模式：**订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

## 03. 防抖和截流 

在开发的过程中，我们经常会需要绑定一些持续触发的事件，如 resize、scroll、mousemove 等等，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数浪费性能。

#### 防抖（debounce）

> 指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

#### 节流（throttle）

> 指连续触发事件但是在 n 秒中只执行一次函数

**函数防抖和节流，都是控制事件触发频率的方法。应用场景有很多，输入框持续输入，将输入内容远程校验、多次触发点击事件、onScroll等等。**

## 04. 深拷贝和浅拷贝

> 深拷贝和浅拷贝最根本的区别在于是否是真正获取了一个对象的复制实体，而不是引用，
> **深拷贝在计算机中开辟了一块内存地址用于存放复制的对象，而浅拷贝仅仅是指向被拷贝的内存地址，如果原地址中对象被改变了，那么浅拷贝出来的对象也会相应改变。**



## 05. Diff算法

## 06. 实现PromiseA+

## 07. 从0到1实现redux























































