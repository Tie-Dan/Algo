function createStore() {
  //需要监听的值
  let data = 0;
  //所有依赖的对列
  let listenters = [];
  //收集依赖方法
  function subscribe(listener) {
    listenters.push(listener);
  }
  //用来重写数据的赋值操作，添加通知所有依赖的操作
  function dispatch(val) {
    data = val;
    listenters.forEach((v, i) => {
      v();
    })
  }
  function getState() {
    return data
  }
  return {
    subscribe,
    dispatch,
    getState
  }

}
let store = createStore()
//我们主动收集一下需要通知的依赖
store.subscribe(() => {
  console.log("监听到数据变化");
})
console.log("改变前----" + store.getState());//改变前----0
store.dispatch(1);
console.log("改变后----" + store.getState());//改变后----1

//状态会自增
// setInterval(() => {
//   let count = store.getState();
//   count++
//   console.log(store.getState());
//   store.dispatch(count);
// }, 1000)

// console.log(store.getState());//0
setInterval(() => {
  let count = store.getState();
  count++
  console.log(store.getState());
  store.dispatch(count);
}, 1000)
store.dispatch("abc");
