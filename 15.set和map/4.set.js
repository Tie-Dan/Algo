let set = new Set(['大娃', '二娃', '三娃'])

console.log(set.keys()) // SetIterator {'大娃', '二娃', '三娃'}
console.log(set.values()) // SetIterator {'大娃', '二娃', '三娃'}
console.log(set.entries()) // SetIterator {'大娃', '二娃', '三娃'}

for (let item of set.keys()) {
    console.log(item);
}
for (let item of set.entries()) {
    console.log(item);
}

set.forEach((value, key) => {
    console.log(key + ' : ' + value)
})
console.log([...set])


let set1 = new Set([1, 2, 3])
set2 = new Set([...set1].map(item => item * 3))
console.log([...set2]) // [2, 4, 6]

set3 = new Set([...set2].filter(item => (item >= 4)))
console.log([...set3]) //[4, 6]