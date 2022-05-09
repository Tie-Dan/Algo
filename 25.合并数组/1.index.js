let ad = [1, 3, 5, 6, 7, 13, 14, 15, 16, 20, 33]
let ap = [3, 4, 6, 8, 9, 13, 17, 18, 19]

// 合并后的数组

let between = []

function transforNew() {
  // 直接循环次数为两个数组的总长度
  while (ad.length + ap.length) {
    // 如果有一个数组添加完 就break
    if (ad.length < 1 || ap.length < 1) {
      // 则剩余的数组合并到between
      between = between.concat(ad.length < 1 ? ap : ad)
      break
    }
    between.push(ad[0] >= ap[0] ? ap.shift() : ad.shift())
  }
  return between
}

console.log(transforNew(ad, ap))