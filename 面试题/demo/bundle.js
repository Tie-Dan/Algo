// 1. 获取模块内容
const fs = require('fs')
const parser = require('@babel/parser')
const path = require('path')
const traverse = require('@babel/traverse').default
// 获取文件内容的函数
const getModuleInfo = file => {
    const body = fs.readFileSync(file, 'utf-8')
    const ast = parser.parse(body, {
        sourceType: 'module' // 表示解析Es6模块
    })
    const deps = {} // 收集依赖路径

    traverse(ast, {
        ImportDeclaration({
            node
        }) {
            const dirname = path.dirname(file)
            const abspath = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = abspath
        }
    })
    console.log(deps)
}
getModuleInfo('./src/index.js')