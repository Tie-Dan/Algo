function createStore(reducer) {
  let data = 0;
  let listenters = [];

  function subscribe(listener) {
    listenters.push(listener);
  }
  //修改 store. dispatch方法，告诉它修改 state 的时候，按照我们的计划修改
  function dispatch(action) {
    data = reducer(data, action);
    listenters.forEach((v, i) => {
      v();
    });
  }
  function getState(params) {
    return data;
  }
  return {
    subscribe,
    dispatch,
    getState
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return ++state
    default:
      return state;
  }
}
//告诉 store，我的修改计划是什么
let store = createStore(reducer);
store.subscribe(() => {
  //   console.log("监听到数据变化");
});
let action = {
  type: "INCREMENT"
}
store.dispatch(action);
console.log(store.getState());//1
