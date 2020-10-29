const s = new Set()
s.add(0)
s.add(NaN)
console.log(s.has(-0)) // true
console.log(s.has(NaN)) // true