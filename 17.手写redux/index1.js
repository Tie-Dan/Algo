//需要监听的值
let data = 0;
//所有依赖的对列
let listenters = [];
//收集依赖方法
function subscribe(listener) {
  listenters.push(listener);
}
//用来重写数据的赋值操作，添加通知所有依赖的操作
function changeData(val) {
  data = val;
  listenters.forEach((v, i) => {
    v();
  })
}
//我们主动收集一下需要通知的依赖
subscribe(() => {
  console.log("监听到数据变化");
})
//改变监听的值
changeData(1)
