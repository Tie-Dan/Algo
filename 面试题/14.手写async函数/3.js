const getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000));

function* testG() {
    const data = yield getData();
    console.log('data: ', data);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}



function co(generator) {
    return new Promise((resolve, reject) => {
        const gen = generator();

        function next(...param) {
            let tmp = gen.next(...param);
            if (tmp.done) {
                resolve(tmp.value);
                return;
            }
            tmp.value.then((...ret) => {
                next(...ret);
            })
        }
        next();
    })
}

co(testG).then((res) => {
    console.log(res);
})