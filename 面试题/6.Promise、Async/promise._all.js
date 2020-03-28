const fs = require('fs')
const util = require('util')
let readFile = util.promisify(fs.readFile)

let isPromise = (x) => {
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        if (typeof x.then === 'function') {

            return true
        }
    }
    return false;
}

Promise.all = (promises) => {
    console.log('all')
    return new Promise((resolve, reject) => {
        let arr = []
        let idx = 0
        let promisesData = (value, index) => {
            arr[index] = value
            if (++idx === promises.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let x = promises[i]
            if (isPromise(x)) {
                x.then(y => {
                    promisesData(y, i)
                }, reject)
            } else {
                promisesData(x, i)
            }
        }
    })
}

Promise.all([1, readFile('./name.txt', 'utf-8'), readFile('./age.txt', 'utf-8'), 3])
    .then(data => {
        console.log(data)
    })