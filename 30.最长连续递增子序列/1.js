let findLength = function (nums) {
  let res = 0 // 最大子序列的长度
  let len = nums.length
  let count = 1
  if (len === 1) return 1// 只有一个返回1
  for (let i = 1; i < len; i++) {
    // 如果当前数小于等于它前面的数，说明不是连续递增序列，重新计算
    if (nums[i] <= nums[i - 1]) {
      count = 1
    } else {
      count++ // 如果满足递增 那就继续增加
    }
    res = Math.max(count, res) // 每次重新赋值 选最大那个
  }
  return res
}

console.log(findLength([1, 3, 3, 5, 6, 4, 7]))