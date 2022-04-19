function createStore() {
  // 需要监听的值
  let data = 0

  // 收集依赖
  let listenters = []

  // 收集依赖的方法
  function subscribe(listenter) {
    listenters.push(listenter)
  }

  // 发生改变通知左右依赖项
  function dispatch(action) {
    data = reducer(data, action)
    listenters.forEach((v, i) => {
      v()
    })
  }
  // 获取状态
  function getState() {
    return data
  }
  return {
    subscribe,
    dispatch,
    getState
  }
}
function reducer(state, action) {
  switch (action.type) {
    case "TIEDAN":
      return ++state
    default:
      return state
  }
}

const store = createStore()
store.subscribe(() => {
  console.log('监听的数据发生变化了')
})
// console.log('改变前' + store.getState())
// // 改变监听的值
// store.dispatch(1)

// console.log('改变后' + store.getState())

// setInterval(() => {
//   let count = store.getState()
//   count++
//   console.log(store.getState())
//   store.dispatch(count)
// }, 1000)
// store.dispatch('tiedan')
let action = {
  type: "TIEDAN"
}


store.dispatch(action)

console.log(store.getState())