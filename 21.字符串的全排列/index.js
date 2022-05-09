// > 'abc'

//   > ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
// [][abc]
// [a][bc]
//   [ab][c]
//     [abc][]
//   [ac][b]
//     [acb][]

function pre(s) {
  let res = []
  s = s.split('').sort((a, b) => {
    return a > b ? 1 : -1
  }).join('')
  const dfs = (curr, store) => {
    // 1. 是否满足条件添加
    if (!store.length) {
      return res.push(curr)
    }
    for (let i = 0; i < store.length; i++) {
      if (i > 0 && store[i] === store[i - 1]) continue
      // 3. 递归 dfs
      console.log(curr + store[i], store.slice(0, i) + store.slice(i + 1))
      dfs(curr + store[i], store.slice(0, i) + store.slice(i + 1))
    }

  }
  dfs('', s)
  return res
}

console.log(pre('abc'))