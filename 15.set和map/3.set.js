let set = new Set()
set.add(1).add(2).add(1)

set.has(1) // true
set.has(3) // false
set.delete(1)
set.has(1) // false