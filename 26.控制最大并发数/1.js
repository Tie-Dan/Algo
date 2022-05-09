const URLs = [
  'bytedance.com',
  'tencent.com',
  'alibaba.com',
  'microsoft.com',
  'apple.com',
  'hulu.com',
  'amazon.com'
];


class PromisePool {
  constructor(max, fn) {
    this.max = max // 最大并发数
    this.fn = fn // 自定义的请求函数
    this.pool = [] // 并发池
    this.urls = [] // 剩余的请求地址
  }
  start(urls) {
    this.urls = urls
    //  循环把并发池塞满
    while (this.pool.length < this.max) {
      let url = this.urls.shift()
      this.setTask(url)
    }
    // 利用Promise.race 方法来获得并发池中某个任务完成的信号
    let race = Promise.race(this.pool)
    this.run(race)
  }
  setTask(url) {
    if (!url) return
    let task = this.fn(url)
    this.pool.push(task) // 将任务推入pool并发池中
    console.log(`${url}开始，当前的并发数:${this.pool.length}`)
    task.then(res => {
      // 请求结束将该promise任务从并发池中移除
      this.pool.splice(this.pool.indexOf(task), 1)
      console.log(`${url}结束，当前的并发数:${this.pool.length}`)
    })
  }

  run(race) {
    race.then(res => {
      // 每当并发池中完成一个任务，就在塞入一个任务
      let url = this.urls.shift()
      this.setTask(url)
      this.run(Promise.race(this.pool))
    })
  }

}
// 模拟异步请求函数
let n = 0
let requestFn = (url) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务${url}完成`)
    }, 1000 * n++)
  }).then(res => {
    console.log('外部逻辑', res)
  })
}



// 并发数为3
const pool = new PromisePool(3, requestFn)

pool.start(URLs)


