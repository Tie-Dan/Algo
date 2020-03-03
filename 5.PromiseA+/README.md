## 1. 术语

- 1.1 "promise"是具有`then`方法的对象或函数，其行为符合此规范。
- 1.2 "thenable"是定义`then`方法的对象或函数。
- 1.3 "value"是任意合法的Javascript值，（包括`undefined`,thenable, promise）
- 1.4 "exception"是使用`throw`语句抛出的值
- 1.5 "reason"是表示promise为什么被rejected的值

## 2. 要求

### 2.1 Promise状态

一个promise必须处于三种状态之一： 请求态（pending）， 完成态（fulfilled），拒绝态（rejected）

#### 2.1.1 当promise处于请求状态（pending）时

- 2.1.1.1 promise可以转为fulfilled或rejected状态

#### 2.1.2 当promise处于完成状态（fulfilled）时

- 2.1.2.1 promise不能转为任何其他状态
- 2.1.2.2 必须有一个值，且此值不能改变

#### 2.1.3 当promise处于拒绝状态（rejected）时

- 2.1.3.1 promise不能转为任何其他状态
- 2.1.3.2 必须有一个原因（reason），且此原因不能改变

### 2.2 `then`方法

promise必须提供`then`方法来存取它当前或最终的值或者原因。
promise的`then`方法接收两个参数：

```
promise.then(onFulfilled, onRejected)
```

#### 2.2.1 `onFulfilled`和`onRejected`都是可选的参数：

- 2.2.1.1 如果 `onFulfilled`不是函数，必须忽略
- 2.2.1.1 如果 `onRejected`不是函数，必须忽略

#### 2.2.2 如果`onFulfilled`是函数:

- 2.2.2.1 此函数必须在`promise` 完成(fulfilled)后被调用,并把`promise` 的值作为它的第一个参数
- 2.2.2.2 此函数在`promise`完成(fulfilled)之前绝对不能被调用
- 2.2.2.2 此函数绝对不能被调用超过一次

#### 2.2.3 如果`onRejected`是函数:

- 2.2.2.1 此函数必须在`promise` rejected后被调用,并把`promise` 的reason作为它的第一个参数
- 2.2.2.2 此函数在`promise` rejected之前绝对不能被调用
- 2.2.2.2 此函数绝对不能被调用超过一次

#### 2.2.4 直到执行上下文堆栈仅包含平台代码之前，onFulfilled 或 onRejected 不能够被调用 [3.1](https://segmentfault.com/a/1190000015914967#3.1)

#### 2.2.5 onFulfilled 和 onRejected 必须以函数的形式被调用（即没有this值）. [3.2](https://segmentfault.com/a/1190000015914967#3.2)

#### 2.2.6 `then`可以在同一个promise里被多次调用

- 2.2.6.1 如果/当 `promise` 完成执行（fulfilled）,各个相应的`onFulfilled`回调

必须根据最原始的`then` 顺序来调用

- 2.2.6.2 如果/当 `promise` 被拒绝（rejected）,各个相应的`onRejected`回调

必须根据最原始的`then` 顺序来调用

#### 2.2.7 `then`必须返回一个promise [3.3](https://segmentfault.com/a/1190000015914967#3.3)

```
promise2 = promise1.then(onFulfilled, onRejected);
```

- 2.2.7.1 如果`onFulfilled`或`onRejected`返回一个值`x`, 运行
  Promise Resolution Procedure `[[Resolve]](promise2, x)` [2.3](https://segmentfault.com/a/1190000015914967#23)
- 2.2.7.2 如果`onFulfilled`或`onRejected`抛出一个异常`e`,`promise2`

必须被拒绝（rejected）并把`e`当作原因

- 2.2.7.3 如果`onFulfilled`不是一个方法，并且`promise1`已经完成（fulfilled）,
  `promise2`必须使用与`promise1`相同的值来完成（fulfiled）
- 2.2.7.4 如果`onRejected`不是一个方法，并且`promise1`已经被拒绝（rejected）,
  `promise2`必须使用与`promise1`相同的原因来拒绝（rejected）

### 2.3 Promise解决程序

**promise解决程序**是一个抽象的操作，它把一个 promise 和一个 value 作为输入，我们将这个表示为 [[Resolve]](promise, x)。如果 x 是一个 thenable ，它将会试图让 promise 采用 x 的状态，前提是x的行为至少有点像一个 promise。否则，它将会用值 x 执行 promise。
对这些 thenable 的处理使得与 promise 实现方式能够去互相操作。只要它们公开了符合 Promise/A+ 的 then 方法。它还使得 promises/A+ 实现方式能够采用合理的 then 方法去“同化”不一致的实现方式。
为了运行[[Resolve]](promise, x)，执行以下步骤：

#### 2.3.1 如果`promise`和`x`引用同一个对象，则用`TypeError`作为原因拒绝（reject）`promise`。

#### 2.3.2 如果`x`是一个promise,采用promise的状态[3.4](https://segmentfault.com/a/1190000015914967#3.4)

- 2.3.2.1 如果`x`是请求状态(pending),`promise`必须保持pending直到`x`fulfilled或rejected
- 2.3.2.2 如果`x`是完成态(fulfilled)，用相同的值完成fulfill`promise`
- 2.3.2.2 如果`x`是拒绝态(rejected)，用相同的原因reject`promise`

#### 2.3.3另外，如果`x`是个对象或者函数

- 2.3.3.1 让 then 作为 x.then。

- 2.3.3.2 如果取属性 x.then 会导致抛出异常 e，则以 e 为 reason reject promise。

- 2.3.3.3 如果 then 是一个函数，让 x 作为 this 调用它，第一个参数为 resolvePromise，第二个参数为 rejectPromise，然后：
  - 2.3.3.3.1 如果使用value y 调用 resolvepromise 时，运行[[Resolve]](promise, y)。
  - 2.3.3.3.2 如果使用reason r 调用 rejectPromise 时，也用 r reject promise。
  - 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都被调用了，或多次调用同一参数，那么第一个调用优先，其他的调用都会被忽略。
  - 2.3.3.3.4 如果调用 then 的过程中抛出了一个意外 e
    - 2.3.3.3.4.1 如果 resolvePromise 或者 rejectPromise 被调用了，那么忽略它。
    - 2.3.3.3.4.2 否则，把 e 作为 reason reject promise。
- 2.3.3.4 如果 then 不是一个函数，将 x 作为参数执行 promise。

#### 2.3.4 如果 `x`既不是对象也不是函数，用`x`完成(fulfill)`promise`

如果一个参与了 thenable 循环链的 thenable 去 resolve promise，这样 [[Resolve]](promise, thenable) 的递归性质最终会导致 [[Resolve]](promise, thenable) 会被再次调用，遵循上述算法将会导致无限递归。我们鼓励去实现（但不是必需的）检测这样的递归，并以 TypeError 作为 reason 去 reject Promise。[3.6](https://segmentfault.com/a/1190000015914967#3.6)

## 3.注意

### 3.1这里的"平台代码"

指的是引擎，环境和 promise 实现代码。实际上，这个要求保证了 onFulfilled 和 onRejected 将会异步执行，在事件循环之后，用一个新的堆栈来调用它。 这可以通过“宏任务”机制（如 settimeou t或 setimmediate ）或“微任务”机制（如 mutationobserver 或 process.nextick）来实现。由于 Promise 实现被视为平台代码，因此它本身可能包含一个任务调度队列或“trampoline”，并在其中调用处理程序。

### 3.2 没有this的情况

也就是说，在严格模式下，这（指的是this）在它们内部将会是 undefined, 在宽松模式下，它将成为全局对象。

### 3.3 then必须返回promise

在实例满足所有要求的情况下，可以允许`promise2 === promise1`.
每个实例都必须表明是否能实现，以及在什么情况下，`promise2 === promise1`

### 3.4 关于x

一般来说，只有当 X 来自当前的实现时，才知道它是一个真正的 promise。本条款允许使用特定于实现的方法来采用已知一致承诺的状态。

### 3.5 关于x.then

此过程首先存储对 x 的引用，然后测试该引用，然后调用该引用，避免多次访问 x.then 属性。这些预防措施对于确保访问器属性的一致性非常重要，访问器属性的值可能在两次检索之间发生更改。

### 3.6 如何对待thenable chain

实现方式中不应当在 thenbale 链中的深度设置主观的限制，并且不应当假设链的深度超过主观的限制后会是无限的。只有真正的循环才能导致 TypeError。如果遇到由无限多个不同 thenable 组成的链，那么永远递归是正确的行为

## 测试

```js
npm i -g promises-aplus-tests

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

promises-aplus-tests promise.js
```

