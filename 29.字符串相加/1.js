let addStrings = function (num1, num2) {
  let res = ''
  let carry = 0
  let i1 = num1.length - 1
  let i2 = num2.length - 1
  while (i1 >= 0 || i1 >= 0) {
    const x = i1 >= 0 ? num1[i1] - '0' : 0
    const y = i2 >= 0 ? num2[i2] - '0' : 0
    const sum = x + y + carry
    res += (sum % 10)
    carry = Math.floor(sum / 10)
    i1--
    i2--
  }
  if (carry) res += carry
  return res.split("").reverse().join("")

}

console.log(addStrings('199', '188'))