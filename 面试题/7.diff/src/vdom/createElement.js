import {
    vnode
} from "./vnode"

export default function createElement(type, props = {}, ...children) {
    // 获取属性的key 然后删掉
    let key
    if (props.key) {
        key = props.key
        delete props.key
    }
    // 子节点是标签还是文本
    children = children.map(child => {
        if (typeof child === 'string') {
            return vnode(undefined, undefined, undefined, undefined, child)
        } else {
            return child
        }
    })
    return vnode(type, props, key, children)
}