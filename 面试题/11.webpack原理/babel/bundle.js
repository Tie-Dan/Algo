const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = file => {
    const body = fs.readFileSync(file, 'utf-8')
    const ast = parser.parse(body, {
        // 表示我们要解析的是es6模块
        sourceType: 'module'
    })
    const deps = {}
    traverse(ast, {
        ImportDeclaration({
            node
        }) {
            const dirname = path.dirname(file);
            const absPath = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = absPath
        }
    })
    const {
        code
    } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    const moduleInfo = {
        file,
        deps,
        code
    }
    console.log(moduleInfo)
    return moduleInfo

}
const parseModules = file => {
    // 定义依赖图
    const depsGraph = {}
    // 首先获取入口的信息
    const entry = getModuleInfo(file)
    const temp = [entry]
    for (let i = 0; i < temp.length; i++) {
        const item = temp[i]
        const deps = item.deps
        if (deps) {
            // 遍历模块的依赖，递归获取模块信息
            for (const key in deps) {
                if (deps.hasOwnProperty(key)) {
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }
    temp.forEach(moduleInfo => {
        depsGraph[moduleInfo.file] = {
            deps: moduleInfo.deps,
            code: moduleInfo.code
        }
    })
    console.log(depsGraph)
    return depsGraph
}
const bundle = file => {
    const depsGraph = JSON.stringify(parseModules(file))
    return `(function(graph){
        function require(file) {
            var exports = {};
            function absRequire(relPath){
                return require(graph[file].deps[relPath])
            }
            (function(require, exports, code){
                eval(code)
            })(absRequire, exports, graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`
}
const content = bundle('./src/index.js')
// 写入到dist/bundle.js
fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)