const s = new Set();

[1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x))


for (let i of s) {
    console.log(i) // 1 2 3 4
}

// 去重数组的重复对象
let arr = [1, 2, 3, 2, 1, 1]
console.log([...new Set(arr)])