let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter(value => set2.has(value)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter(value => !set2.has(value)))

console.log(intersect) // Set {2, 3} 交集
console.log(union) // Set {1, 2, 3, 4} 并集
console.log(difference) // Set {1} 补集