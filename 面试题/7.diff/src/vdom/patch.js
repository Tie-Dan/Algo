// 新老属性的对比
function updateProps(newVnode, oldProps = {}) {
    let domElement = newVnode.domElement // 新的真实DOM
    let newProps = newVnode.props //当前节点中的属性
    // 和老的作对比
    // 1.老的里面有 新的里面没有 这个属性直接干掉
    for (let oldPropname in oldProps) {
        if (!newProps[oldPropname]) {
            delete domElement[oldPropname]
        }
    }
    // 2.老的里面没有 新的里面有
    for (let newPropsName in newProps) {
        domElement[newPropsName] = newProps[newPropsName]
    }
    // 3. style
    let newStyleObj = newProps.style || {}
    let oldStyleObj = oldProps.style || {}
    for (let propName in oldStyleObj) {
        if (!newStyleObj[propName]) {
            domElement.style[propName] = ''
        }
    }
    // 循环属性给DOM
    for (let newPropsName in newProps) {
        // 假如有style
        if (newPropsName == 'style') {
            let styleObj = newProps.style
            for (let s in styleObj) {
                domElement.style[s] = styleObj[s]
            }
        } else {
            domElement[newPropsName] = newProps[newPropsName]
        }
    }

}

function createDomElementVnode(vnode) {

    let {
        type,
        props,
        key,
        children,
        text
    } = vnode

    if (type) {
        vnode.domElement = document.createElement(type)
        // 根据我们虚拟节点的属性 去更新真实的DOM
        updateProps(vnode)
        // 递归调用渲染
        children.forEach(childNode =>
            render(childNode, vnode.domElement)
        )
    } else {
        vnode.domElement = document.createTextNode(text)
    }
    return vnode.domElement
}
export function render(vnode, container) {
    let ele = createDomElementVnode(vnode)
    container.appendChild(ele)
}
export function patch(oldVnode, newVnode) {
    // 判断类型 不同
    if (oldVnode.type !== newVnode.type) {
        return oldVnode.domElement.parentNode.replaceChild(
            createDomElementVnode(newVnode),
            oldVnode.domElement
        )
    }
    // 类型相同 换文本
    if (oldVnode.text) {
        if (oldVnode.text == newVnode.text) return
        return oldVnode.domElement.textContent = newVnode.text
    }
    let domElement = newVnode.domElement = oldVnode.domElement
    updateProps(newVnode, oldVnode.props)
    // 对比儿子
    // 1. 老的有儿子 新的有儿子
    // 2. 老的有儿子 新的没儿子
    // 3. 新增儿子

    let oldChildren = oldVnode.children
    let newChildren = newVnode.children

    if (oldChildren.length > 0 && newChildren.length > 0) {
        // 老的有儿子 新的没儿子
        updateChildren(domElement, oldChildren, newChildren)
    } else if (oldChildren.length > 0) {
        // 老的有儿子 新的没儿子
        domElement.innerHTML = ''
    } else if (newChildren.length > 0) {
        // 新增儿子 转成DOM放进去
        for (let i = 0; i < newChildren.length; i++) {
            domElement.appendChild(createDomElementVnode(newChildren[i]))
        }
    }
}

function isSomeVnode(oldVnode, newVnode) {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}
// 创建映射表 {a:0,b:1,c:3}
function keyMapByIndex(oldChildren) {
    let map = {}
    for (let i = 0; i < oldChildren.length; i++) {
        let current = oldChildren[i]
        if (current.key) {
            map[current.key] = i
        }
    }
    return map
}


function updateChildren(parent, oldChildren, newChildren) {
    let oldStartIndex = 0
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]

    let newStartIndex = 0
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]

    // 判断老的孩子和新的孩子 循环的时候 谁先结束就停止
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldEndIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex]
        } else
            // 如果标签和key相同接着往下走
            if (isSomeVnode(oldStartVnode, newStartVnode)) {
                // 标签相同 让他们去比较属性
                patch(oldStartVnode, newStartVnode)
                // 如果他们俩一样 分别往后走一位
                oldStartVnode = oldChildren[++oldStartIndex]
                newStartVnode = newChildren[++newStartIndex]

            } else if (isSomeVnode(oldEndVnode, newEndVnode)) {

            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]

        } else if (isSomeVnode(oldStartVnode, newEndVnode)) {

            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextSiblings)
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else if (isSomeVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode)
            parent.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else {
            // 暴力对比
            let index = map[newStartIndex.key]
            if (index = null) {
                parent.insertBefore(createDomElementVnode(newStartVnode),
                    oldStartVnode.domElement)
            } else {
                let toMoveNode = oldChildren[index]
                patch(toMoveNode, newStartVnode)
                parent.insertBefore(toMoveNode.domElement, oldStartVnode.domElement)
                oldChildren[index] = undefined
            }
            // 移动位置
            newStartVnode = newChildren[++newStartIndex]
        }
    }
    // 把多余的节点 放进去  只有小于或者等于 才说明有剩余
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // parent.appendChild(createDomElementVnode(newChildren[i]))
            let beforElement = newChildren[newEndIndex + 1] == null ? null :
                newChildren[newEndIndex + 1].domElement
            parent.insertBefore(createDomElementVnode(newChildren[i]), beforElement)
        }
    }
    // 判断中间的undefinde
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                parent.removeChild(oldChildren[i].domElement)
            }
        }
    }
}