import {
    createElement,
    render,
    patch
} from './vdom'


// 创建虚拟dom
let oldVnode = createElement('ul', {},
    createElement('li', {
        style: {
            background: 'red'
        },
        key: 'A'
    }, 'A'),
    createElement('li', {
        style: {
            background: 'yellow'
        },
        key: 'B'
    }, 'B'),
    createElement('li', {
        style: {
            background: 'blue'
        },
        key: 'C'
    }, 'C'),
    createElement('li', {
        style: {
            background: 'green'
        },
        key: 'D'
    }, 'D')
)


render(oldVnode, app)

let newVnode = createElement('ul', {},

    createElement('li', {
        style: {
            background: 'yellow'
        },
        key: 'B'
    }, 'B1'),
    createElement('li', {
        style: {
            background: 'blue'
        },
        key: 'C'
    }, 'C1'),
    createElement('li', {
        style: {
            background: 'green'
        },
        key: 'D'
    }, 'D1'),
    createElement('li', {
        style: {
            background: 'red'
        },
        key: 'A'
    }, 'A1'),
)
setTimeout(() => {
    patch(oldVnode, newVnode)
}, 2000)